import { ShareService } from "./../../module-shared/services/share.service";
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { InitiativeList } from '../../module-shared/constants/common.const';
import { LoadingService } from '../../module-shared/services/loading.service';

declare var $: any;
declare var cVotingUtil: any;
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
  isAttach = false;           // 파일 첨부 Flag

  initiativeList;             // 발의 가데이터 리스트
  validationMsg = '';         // 유효성 체크 alert msg
  imgPath = '';               // 첨부할 이미지 경로
  imgName = '';               // 첨부한 이미지 이름


  constructor(
    private router: Router,
    private loading: LoadingService,
    private zone: NgZone,
    private shareService: ShareService
  ) { window["InitiativeRegistrationComponent"] = this; }

  ngOnInit() {
    if (this.shareService.mobileCheck()) {
      cVotingUtil.getStorage("initiative", "InitiativeList");
    } else {
      this.initiativeList = InitiativeList;
    }
  }

  // 페이지 이동
  movePage (menu: string, infos?: any) {
    let param = {};
    switch (menu) {
      case 'main':
          menu = 'main';
        break;

      case 'initiativeDetail':
        menu = 'initiative';
        param = { infos };
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

    let img = '';
    // 이미지 첨부 확인
    if (this.isAttach) {
      img = this.imgPath;
    }
    const today = new Date();
    let regDate, year, month, day, hours, minutes = '';
    year = today.getFullYear().toString();
    month = (today.getMonth() + 1).toString();
    day = today.getDate().toString();
    hours = today.getHours().toString();
    minutes = today.getMinutes() < 10 ? "0" + today.getMinutes().toString() : today.getMinutes().toString();
    regDate = year + month + day + hours + minutes;

    const posts = {
      idx : 0,
      writer : writer,
      subject : subject,
      content : content,
      regDate : regDate,
      img : img,
      recommandCnt : 0,
      isAttach : 'N'    // 파일 첨부 기본값 N
    };

    console.log('@@@ this.initiativeList >>>>>>>> ' + JSON.stringify(this.initiativeList));

    // 저장되어있는 발의 리스트 확인
    if (this.shareService.nullCheck(this.initiativeList)) {
      localStorage.setItem('initiativeList', JSON.stringify(posts));
    } else {
//      const localInitiativeList: any = $.parseJSON(this.initiativeList);
      const localInitiativeList: any = this.initiativeList;

      // 글 번호 재설정
      posts.idx = localInitiativeList.length;
      posts.isAttach = this.isAttach === true ? 'Y' : 'N';
      localInitiativeList.push({
        idx :  posts.idx,
        writer :  posts.writer,
        subject :  posts.subject,
        content :  posts.content,
        regDate :  posts.regDate,
        img :  posts.img,
        recommandCnt :  posts.recommandCnt,
        isAttach : posts.isAttach
      });

      localStorage.setItem('initiativeList', JSON.stringify(localInitiativeList));
    }

    this.movePage('initiativeDetail', JSON.stringify(posts));
  }

  getData(res) {
//  console.log("@@@ getData List >>>>>>>>>>>>>> ", JSON.stringify(res.stored_data));
//  console.log('@@@ length @@@@@@@ >>> ' + res.stored_data.length);
//    const list: any = res.stored_data;
    this.zone.run(() => this.initiativeList = res.stored_data);
//    console.log('@@@ initiativeList last idx >>>> ' + this.initiativeList[6].subject);
  }

  // 갤러리 호출
  callGallery() {
    cVotingUtil.getImagePath();
  }

  // 갤러리 콜백
  setImgPath(res) {
//    console.log('@@@ setImgPath res >>> ' + JSON.stringify(res));
    this.imgPath = res.image_path;
    this.imgName = res.image_path.split('/')[this.imgPath.split('/').length - 1];
    this.isAttach = true;
    this.zone.run(() => this.imgName = this.imgName);
  }
}
