import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';

@Component({
  selector: 'app-c-voting-main',
  templateUrl: './c-voting-main.component.html',
  styleUrls: ['./c-voting-main.component.css']
})
export class CVotingMainComponent implements OnInit {

  selected_menu = 'initiative';

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {

    const swiper = new Swiper('.swiper-container', {
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

  onClickNavigateMenu (menu: string) {
    console.log('menu >>>> ' + menu);

    this.selected_menu = menu;
    this.router.navigate([menu]);

    switch (menu) {
      case '/module/initiative':
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
