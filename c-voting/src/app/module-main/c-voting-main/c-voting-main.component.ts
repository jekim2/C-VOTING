import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';
import { InitiativeList, ReviewList, VoteList } from '../../../app/module-shared/constants/common.const';
import { ShareService } from '../../module-shared/services/share.service';

declare var $: any;
declare var cVotingUtil: any;

@Component({
  selector: 'app-c-voting-main',
  templateUrl: './c-voting-main.component.html',
  styleUrls: ['./c-voting-main.component.css']
})
export class CVotingMainComponent implements OnInit {

  selected_menu = 'initiative';

  initiativeList = [];      // 발의
  reviewList: any = [];     // 심의
  voteList:any = [];        // 의결
  initiativeTopList = [];   // 발의 top list
  reviewTopList:any = [];   // 심의 top list
  reviewTitle: any = {'dDay' : 0, 'title': ''};

  constructor(
    private router: Router,
    private shareService: ShareService
  ) { }

  ngOnInit() {

    if (!this.shareService.nullCheck(InitiativeList)) {
      if (localStorage.getItem('recomCntChange') !== 'Y') {     // 추천수 변경됬을때
        localStorage.setItem('initiativeList' , JSON.stringify(InitiativeList));
      }
      this.initiativeList = $.parseJSON(localStorage.getItem("initiativeList"));
    }

    if (!this.shareService.nullCheck(ReviewList)) {
      if (localStorage.getItem('moveToReiview') !== 'Y') {     // 발의 -> 심의 데이터로 이동했을때
        localStorage.setItem('reviewList' , JSON.stringify(ReviewList));
      }
      this.reviewList = $.parseJSON(localStorage.getItem("reviewList"));
    }

    if (!this.shareService.nullCheck(VoteList)) {
      localStorage.setItem('voteList' , JSON.stringify(VoteList));
      this.voteList = $.parseJSON(localStorage.getItem("voteList"));
      console.log("voteList >>> " , JSON.stringify(this.voteList));
    }

    this.initiativeTopThree();

    this.reviewTopThree();

  }

  
 ngAfterViewInit() {

  const swiper = new Swiper('.swiper-container-01', {
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets'
    },
    speed: 400,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    direction: 'horizontal',
    loop: true
  });

  const swiper_02 = new Swiper ('.v-swiper-container', {
    loop: true,
    direction: 'vertical',
    slidesPerView: 1,
    freeMode: true,
    autoHeight: true,
    grabCursor: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    }
  });

 }

 // 발의 top three
  initiativeTopThree () {
    this.initiativeTopList = [];

    if (this.initiativeList.length > 0) {
      const sortList = this.initiativeList.sort(function(a,b){
        return b["recommandCnt"] - a["recommandCnt"];
      });
      for (let i = 0 ; i< sortList.length; i++) {
        console.log("idx>>>>>>>> ", i);
        if ( i < 3) {
          this.initiativeTopList.push(sortList[i]);
        }
      }
    }


  }

  // 심의 top three
  reviewTopThree () {
    this.reviewTopList = [];

    if (this.reviewList.length > 0) {

      const sortList = this.reviewList.sort(function(a,b){
        return b["totalPartiCnt"] - a["totalPartiCnt"];
      });
      const dayList = this.reviewList.sort(function(a,b){
        return b["endDate"] - a["endDate"];
      });
      console.log("dayList >>> ", JSON.stringify(dayList));

      if (dayList.length > 0 ) {
        const endDate =  dayList[0]["endDate"];
        const yEnd = endDate.substring(0, 4);
        const mEnd = endDate.substring(4, 6);
        const dEnd = endDate.substring(6, 8);
        const sDate = new Date (yEnd, mEnd -1 , dEnd);
        const eDate = new Date();
        const gapTime = sDate.getTime() - eDate.getTime();

        this.reviewTitle.dDay = Math.ceil(gapTime / (60 * 1000 * 60 * 24));
        this.reviewTitle.title =  dayList[0].subject;
      }

      for (let i = 0 ; i < sortList.length; i++) {

        // 투표율
        sortList[i]["agreePercent"] = Math.floor(( sortList[i]["agreeCnt"] /  sortList[i]["totalPartiCnt"] ) * 100 );
        sortList[i]["oppPercent"] = Math.floor(( sortList[i]["oppCnt"] /  sortList[i]["totalPartiCnt"] ) * 100 );
        sortList[i]["neutPercent"] = 100 - (sortList[i]["agreePercent"] + sortList[i]["oppPercent"] );
        // D-day
        const endDate =  dayList[i]["endDate"];
        const yEnd = endDate.substring(0, 4);
        const mEnd = endDate.substring(4, 6);
        const dEnd = endDate.substring(6, 8);
        const sDate = new Date (yEnd, mEnd -1 , dEnd);
        const eDate = new Date();
        const gapTime = sDate.getTime() - eDate.getTime();

        sortList[i]["dDay"] = Math.ceil(gapTime / (60 * 1000 * 60 * 24));
        // Top3
        if ( i < 3) {
          this.reviewTopList.push(sortList[i]);
        }
      }

      this.reviewList = sortList;
      // console.log("reviewTopList>>>>>>>> ", this.reviewTopList);
    }

  }


  movePage (menu: string) {

    switch (menu) {
      case 'registration':
          menu = 'initiative/registration';
        break;

      default:
        break;
    }

    this.router.navigate([menu]);
  }

  onClickNavigateMenu (menu: string, data?: any) {
    console.log('menu >>>> ' + menu);
    console.log('data >>>> ' + data);

    this.selected_menu = menu;

    if (menu!== 'review') {
      this.router.navigate([menu ,  { infos : JSON.stringify(data) }]);
    }

    switch (menu) {
      case 'review':
        cVotingUtil.showDiscussionPage(data);
        break;
      case '/module/review':
        break;
      case '/module/vote':
        break;
      case 'search' : 
        
        break;  

      default:
        break;
    }
  }

}
