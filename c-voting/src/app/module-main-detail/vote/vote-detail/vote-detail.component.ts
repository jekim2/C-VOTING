import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from "@angular/router";

declare var $: any;
@Component({
  selector: 'app-vote-detail',
  templateUrl: './vote-detail.component.html',
  styleUrls: ['./vote-detail.component.css']
})
export class VoteDetailComponent implements OnInit {

  isRecommandlAlert = false;

  idx: '';
  detail: any;   // 이전 페이지에서 가져온 상세 내용
  subject: string;
  regDate: '';
  writer: '';
  content: '';
  detailImg: '';
  totalPartiCnt: number;
  viewsCnt: number;
  studentsReplyContent: '';

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
    this.totalPartiCnt = this.detail.totalPartiCnt;
    this.viewsCnt = this.detail.viewsCnt;
    this.studentsReplyContent = this.detail.studentsReplyContent;
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
}
