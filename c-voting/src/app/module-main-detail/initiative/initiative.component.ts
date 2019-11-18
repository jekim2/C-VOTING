import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from "@angular/router";

declare var $: any;
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

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log("params >>>>>>>> " + JSON.stringify(params));
      if (params.has("infos")) {
       const infos = $.parseJSON(params.get("infos"));
       console.log("infos >>>>>>>> " + JSON.stringify(infos));
       this.detail = infos;
       this.setDetail();
      }
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
  }

  onClickNavigateMenu (menu: string) {
    switch (menu) {
      case 'main':
        menu = 'main';
        break;

      case 'back':
        history.back();
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
    console.log('@@@ 추천하기 후 recommandCnt >>> ' + this.recommandCnt);
    console.log('@@@ idx >>> ' + this.idx);

    const initiativeList: any = JSON.parse(localStorage.getItem('initiativeList'));
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

    if (that.recommandCnt >= 200) {
      that.dataMoveToReivew(newList);
    } else {
      localStorage.setItem('initiativeList', JSON.stringify(newList));
    }
  }

  // 추천수 200 넘을시 심의 데이터로 이동
  dataMoveToReivew(newList: any) {
    const reviewList: any = JSON.parse(localStorage.getItem('reviewList'));
    const today = new Date();
    const todayAfter = new Date();
    let startDate, endDate, year, month, day, yearAfter, yearMonth, yearDay = '';
    year = today.getFullYear().toString();
    month = (today.getMonth() + 1).toString();
    day = today.getDate().toString();
    startDate = year + month + day;

    todayAfter.setDate(todayAfter.getDate() + 14);
    yearAfter = todayAfter.getFullYear().toString();
    yearMonth = (todayAfter.getMonth() + 1).toString();
    yearDay = todayAfter.getDate() < 10 ? "0" + todayAfter.getDate().toString() : todayAfter.getDate.toString();
    startDate = yearAfter + yearMonth + yearDay;
    localStorage.setItem('moveToReiview', 'true'); // c-voting 메인에서 dateMove값이 true가 아닐때만 reviewList setItem안하도록.
    reviewList.push({
      idx : reviewList.length,
      type : 'review',
      writer : this.writer,
      subject : this.subject,
      // tslint:disable-next-line:max-line-length
      content : this.content,
      regDate : this.regDate,
      img : '',
      recommandCnt : 0,
      totalPartiCnt : 0, // 총 참여수
      agreePercent : 0,  // 찬성율
      oppPercent : 0,    // 반대율
      neutPercent : 0,   // 기타율
      startDate : startDate, // 심의 시작일
      endDate : endDate,   // 심의 마감일
      agreeCmtList : [],
      oppCmtList : [],
      neutCmtList : []
    });
    localStorage.setItem('reviewList',  JSON.stringify(reviewList));

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

    localStorage.setItem('initiativeList', JSON.stringify(newReviewList));
  }
}
