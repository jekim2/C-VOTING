import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

    localStorage.setItem('initiativeList', JSON.stringify(newList));
  }
}
