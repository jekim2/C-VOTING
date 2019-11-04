import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-c-voting-main',
  templateUrl: './c-voting-main.component.html',
  styleUrls: ['./c-voting-main.component.css']
})
export class CVotingMainComponent implements OnInit {

  selected_menu = '/module/initiative';

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
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

      default:
        break;
    }
  }

}
