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
  reviewList = [];          // 심의
  voteList = [];            // 의결

  constructor(
    private router: Router,
    private shareService: ShareService
  ) { }

  ngOnInit() {


    if (!this.shareService.nullCheck(InitiativeList)) {
      localStorage.setItem('initiativeList' , JSON.stringify(InitiativeList));

      this.initiativeList = $.parseJSON(localStorage.getItem("initiativeList"));
    }

    if (!this.shareService.nullCheck(ReviewList)) {
      localStorage.setItem('reviewList' , JSON.stringify(ReviewList));

      this.reviewList = $.parseJSON(localStorage.getItem("reviewList"));

      console.log("reviewList >>>>>>>>>>> " , JSON.stringify(this.reviewList));
    }

    if (!this.shareService.nullCheck(VoteList)) {
      localStorage.setItem('voteList' , JSON.stringify(VoteList));

      this.voteList = $.parseJSON(localStorage.getItem("VoteList"));
    }


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

    this.selected_menu = menu;

    if (menu!== 'review') {
      this.router.navigate([menu]);
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
