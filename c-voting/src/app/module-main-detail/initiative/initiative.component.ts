import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router, Routes } from "@angular/router";
import { ShareService } from '../../module-shared/services/share.service';
import { PlatformLocation } from '@angular/common';

declare var $: any;
declare var cVotingUtil: any;
@Component({
  selector: 'app-initiative',
  templateUrl: './initiative.component.html',
  styleUrls: ['./initiative.component.css']
})

export class InitiativeComponent implements OnInit {

  isRecommendAlert = false;    // 추천 팝업 Flag
  isRecommendFlag = false;     // 추천한 상태인지 Flag
  idx: '';
  detail: any;   // 이전 페이지에서 가져온 상세 내용
  subject: string;
  regDate: '';
  writer: '';
  content: '';
  detailImg: '';
  recommandCnt: number;
  moveIndex: '';    // 심의로넘길 발의idx
  isAttach;
  initiativeList: any;
  reviewList: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: PlatformLocation,
    private shareService: ShareService,
    private zone: NgZone
  ) {
    this.location.onPopState(() => {
      console.log("back button!!!");
      this.router.navigate(["/main"]);
    });
    // this.shareService.onClickBackButton("main");
    window["InitiativeComponent"] = this;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
//      console.log("params >>>>>>>> " + JSON.stringify(params));
      if (params.has("infos")) {
       const infos = $.parseJSON(params.get("infos"));
//       console.log("infos >>>>>>>> " + JSON.stringify(infos));
       this.detail = infos;
       this.setDetail();
      }
      this.setData();
    });
  }

  setDetail() {
    this.idx = this.detail.idx;
    this.subject = this.detail.subject;
    this.regDate = this.detail.regDate;
    this.writer = this.detail.writer;
    this.detailImg = this.detail.img;
    this.content = this.detail.content;
    this.recommandCnt = this.detail.recommandCnt;
    this.isAttach = this.detail.isAttach;

    // alert(this.detailImg);
  }

  setData() {
    if (this.shareService.mobileCheck()) {
      cVotingUtil.getStorage("initiative", "InitiativeList");
      cVotingUtil.getStorage("initiative", "ReviewList");
    } else {
      this.initiativeList = localStorage.getItem('initiativeList');
      this.reviewList = localStorage.getItem('reviewList');
    }
  }

  onClickNavigateMenu (menu: string) {
    switch (menu) {
      case 'main':
        menu = 'main';
        break;

      default:
        break;
    }

    this.router.navigate([menu]);
  }

  // 추천
  recommend() {
    this.isRecommendAlert = false;
    this.isRecommendFlag = true;
    this.recommandCnt++;

//    const initiativeList: any = JSON.parse(localStorage.getItem('initiativeList'));
    const initiativeList: any = JSON.parse(this.initiativeList);
    const newList: any = [];
    const that = this;

    $(initiativeList).each(function(i) {
      const row = initiativeList[i];

      if (row.idx === that.idx) {
        row.recommandCnt = that.recommandCnt;
        that.moveIndex = i;
      }

      newList.push({
        idx : row.idx,
        writer : row.writer,
        subject : row.subject,
        content : row.content,
        regDate : row.regDate,
        img : row.img,
        recommandCnt : row.recommandCnt
      });
    });

    localStorage.setItem('recomCntChange', 'Y');   // 추천수 변경되었을 때 Y

    if (that.recommandCnt >= 200) {
      that.dataMoveToReivew(newList);
    } else {
//      localStorage.setItem('initiativeList', JSON.stringify(newList));
      cVotingUtil.setStorage('initiative', 'InitiativeList', JSON.stringify(newList));
    }
  }

  // 추천수 200 넘을시 심의 데이터로 이동
  dataMoveToReivew(newList: any) {
//    const reviewList: any = JSON.parse(localStorage.getItem('reviewList'));
    const reviewList: any = JSON.parse(this.reviewList);
    const today = new Date();
    const todayAfter = new Date();
    let startDate, endDate, year, month, day, yearAfter, yearMonth, yearDay = '';
    year = today.getFullYear().toString();
    month = (today.getMonth() + 1).toString();
    day = today.getDate() < 10 ? "0" + today.getDate().toString() : today.getDate.toString();
    startDate = year + month + day;

    todayAfter.setDate(todayAfter.getDate() + 14);
    yearAfter = todayAfter.getFullYear().toString();
    yearMonth = (todayAfter.getMonth() + 1).toString();
    yearDay = todayAfter.getDate() < 10 ? "0" + todayAfter.getDate().toString() : todayAfter.getDate.toString();
    endDate = yearAfter + yearMonth + yearDay;

    localStorage.setItem('moveToReiview', 'Y'); // c-voting 메인에서 dateMove값이 Y 아닐때만 reviewList setItem안하도록.
    reviewList.push({
      idx : reviewList.length,
      type : 'review',
      writer : this.writer,
      subject : this.subject,
      // tslint:disable-next-line:max-line-length
      content : this.content,
      regDate : this.regDate,
      img : this.detailImg,
      recommandCnt : this.recommandCnt,
      totalPartiCnt : 1, // 총 참여수
      agreeCnt : 0,  // 찬성율
      oppCnt : 0,    // 반대율
      neutCnt : 0,   // 기타율
      startDate : startDate, // 심의 시작일
      endDate : endDate,   // 심의 마감일
      agreeCmtList : [],
      oppCmtList : [],
      neutCmtList : []
    });
//    localStorage.setItem('reviewList',  JSON.stringify(reviewList));
    cVotingUtil.setStorage('initiative', 'ReviewList', JSON.stringify(reviewList));

    // 발의 리스트에서 삭제
    newList.splice(this.moveIndex, 1);
//    console.log('@@@ 이동한 idx 삭제한 newList >>> ' + JSON.stringify(newList));
    const newReviewList: any = [];

    $(newList).each(function(i) {
      const row = newList[i];

      newReviewList.push({
        idx : row.idx,
        writer : row.writer,
        subject : row.subject,
        content : row.content,
        regDate : row.regDate,
        img : row.img,
        recommandCnt : row.recommandCnt
      });
    });

//    localStorage.setItem('initiativeList', JSON.stringify(newReviewList));
    cVotingUtil.setStorage('initiative', 'InitiativeList', JSON.stringify(newReviewList));
  }

  getDataCallback(res) {
    console.log("@@@ getData List >>>>>>>>>>>>>> ", JSON.stringify(res.stored_data));
    if (res.stored_data[0].type === 'initiative') {
      this.zone.run(() => this.initiativeList = res.stored_data);
      console.log('@@@ getDataCallback InitiativeList >>> ' + JSON.stringify(this.initiativeList));
    } else if (res.stored_data[0].type === 'review') {
      this.zone.run(() => this.reviewList = res.stored_data);
      console.log('@@@ getDataCallback ReviewList >>> ' + JSON.stringify(this.reviewList));
    }
  }

  setDataCallback(res) {
    console.log('@@@ setDataCallback response >>> ' + JSON.stringify(res));
  }
}
