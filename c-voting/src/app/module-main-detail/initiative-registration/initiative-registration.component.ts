import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InitiativeList } from '../../module-shared/constants/common.const';
import { LoadingService } from '../../module-shared/services/loading.service';

declare var $: any;
@Component({
  selector: 'app-initiative-registration',
  templateUrl: './initiative-registration.component.html',
  styleUrls: ['./initiative-registration.component.css']
})
export class InitiativeRegistrationComponent implements OnInit {

  // Flag
  isCancelAlert = false;      // 글쓰기 취소 팝업 Flag
  isAgreeAlert = false;       // 주의사항 동의 팝업 Flag
  isValidationAlert = false;  // 유효성 체크 팝업 Flag

  initiativeList;             // 발의 가데이터 리스트
  validationMsg = '';         // 유효성 체크 alert msg


  constructor(
    private router: Router,
    private loading: LoadingService
  ) { }

  ngOnInit() {
    this.initiativeList = InitiativeList;
  }

  // 페이지 이동
  movePage (menu: string, idx: any) {
    let param = {};
    switch (menu) {
      case 'main':
          menu = 'main';
        break;

      case 'initiativeDetail':
        menu = 'initiative';
        param = { idx : idx };
        break;

      default:
        break;
    }

    this.router.navigate([menu, param]);
  }

  // 동의 체크박스
  agreeCheck($event) {
    if ($event.target.checked) {
      $('#chkAgree').attr("checked", true);
    } else {
      $('#chkAgree').attr("checked", false);
    }
  }

  // value 값 체크
  validationCheck() {
    const writer = $('#wrtier').val().trim();
    const subject = $('#subject').val().trim();
    const content = $('#content').val();

    if (!$('#chkAgree').attr("checked")) {
      this.isAgreeAlert = true;
      return;
    }

    // 작성자 체크
    if (!writer) {
      this.isValidationAlert = true;
      this.validationMsg = '작성자를 입력해주세요.';
      return;
    }

    // 제목 체크
    if (!subject) {
      this.isValidationAlert = true;
      this.validationMsg = '제목을 입력해주세요.';
      return;
    }

    // 내용 체크
    if (!content) {
      this.isValidationAlert = true;
      this.validationMsg = '내용을 입력해주세요.';
      return;
    }

    this.registration(writer, subject, content);
  }

  // 글 등록
  registration(writer, subject, content) {
//    this.loading.loadingBar_show('cvList01');

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
      posts[0].idx = localInitiativeList.length;
      localInitiativeList.push(posts);
      localStorage.setItem('initiativeList', JSON.stringify(localInitiativeList));
    }

    // setTimeout(() => {
    //   this.loading.loadingBar_hide('cvList01');
    // }, 300);

    this.movePage('initiativeDetail', posts[0].idx);
  }
}
