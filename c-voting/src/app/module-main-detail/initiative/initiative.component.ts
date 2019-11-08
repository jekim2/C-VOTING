import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-initiative',
  templateUrl: './initiative.component.html',
  styleUrls: ['./initiative.component.css']
})
export class InitiativeComponent implements OnInit {

  // Flag
  isRecommandlAlert = false;    // 추천 팝업 Flag

  constructor() { }

  ngOnInit() {
  }

}
