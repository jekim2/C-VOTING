import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InitiativeList } from '../../module-shared/constants/common.const';

declare var $: any;
@Component({
  selector: 'app-initiative-registration',
  templateUrl: './initiative-registration.component.html',
  styleUrls: ['./initiative-registration.component.css']
})
export class InitiativeRegistrationComponent implements OnInit {

  // Flag
  isCancelAlert = false;         // 글쓰기 취소 팝업 Flag
  isAgreeFlag = false;
  initiativeList;               // 발의 가데이터 리스트

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.initiativeList = InitiativeList;
  }

  // 페이지 이동
  movePage (menu: string) {
    switch (menu) {
      case 'main':
          menu = 'main';
        break;

      default:
        break;
    }

    this.router.navigate([menu]);
  }

  // 동의 체크박스
  agreeCheck($event) {
    if ($event.target.checked) {
      $('#chkAgree').attr("checked", true);
    } else {
      $('#chkAgree').attr("checked", false);
    }
  }

  // 글 등록
  registration() {
    const that = this;
    if (!$('#chkAgree').attr("checked")) {
      alert('주의사항에 동의 해주세요.');
      return;
    }

    const writer = $('#wrtier').val().trim();
    const subject = $('#subject').val().trim();
    const content = $('content').val();
    const img = '';
    const today = new Date();
    let regDate, year, month, day, hours, minutes = '';
    year = today.getFullYear().toString();
    month = (today.getMonth() + 1).toString();
    day = today.getDate().toString();
    hours = today.getHours().toString();
    minutes = today.getMinutes() < 10 ? "0" + today.getMinutes().toString() : today.getMinutes().toString();
    regDate = year + month + day + hours + minutes;

    const posts = [{
      idx : 0,
      writer : writer,
      subject : subject,
      content : content,
      regDate : regDate,
      img : img,
      recommandCnt : 0
    }];

    // 저장되어있는 발의 리스트 확인
    if (localStorage.getItem('initiativeList') === null || localStorage.getItem('initiativeList') === '[]') {
      localStorage.setItem('initiativeList', JSON.stringify(posts));
    } else {
      const localInitiativeList: any = $.parseJSON(localStorage.getItem('initiativeList'));
      // 글 번호 재설정
      posts[0].idx = localInitiativeList.length + 1;
//      console.log("@@@ posts idx 재설정 >>> " + posts[0].idx);
      localInitiativeList.push(posts);
      localStorage.setItem('initiativeList', JSON.stringify(localInitiativeList));
    }

    // TODO: 등록 완료 후 등록한 게시글 상세로 이동
  }
}
