import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.css']
})
export class HeaderLayoutComponent implements OnInit {

  selected_menu = "/module/initiative";

  constructor() { }

  ngOnInit() {
  }

  onClickNavigateMenu (menu: string) {
    console.log("menu >>>> " + menu);

    this.selected_menu = menu;

    switch (menu) {
      case "/module/initiative":
        
        break;
      case "/module/review":
        
        break;
      case "/module/vote":
        
        break;
    
      default:
        break;
    }
  }

  

}
