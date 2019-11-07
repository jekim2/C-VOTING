import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-initiative-registration',
  templateUrl: './initiative-registration.component.html',
  styleUrls: ['./initiative-registration.component.css']
})
export class InitiativeRegistrationComponent implements OnInit {

  // Flag
  isCancelAlert = false;         // 글쓰기 취소 팝업 Flag

  constructor() { }

  ngOnInit() {
  }

}
