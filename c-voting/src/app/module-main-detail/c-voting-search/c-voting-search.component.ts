import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-voting-search',
  templateUrl: './c-voting-search.component.html',
  styleUrls: ['./c-voting-search.component.css']
})
export class CVotingSearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onClickNavigateMenu (menu: string) {
    console.log('menu >>>> ' + menu);

    // this.selected_menu = menu;
    // this.router.navigate([menu]);

    switch (menu) {
      case 'back':
        history.back();
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
