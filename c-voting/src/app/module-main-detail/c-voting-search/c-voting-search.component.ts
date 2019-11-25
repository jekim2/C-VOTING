import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { LoadingService } from '../../module-shared/services/loading.service';
import { ShareService } from '../../module-shared/services/share.service';
import { Router } from '@angular/router';

declare var cVotingUtil: any;

@Component({
  selector: 'app-c-voting-search',
  templateUrl: './c-voting-search.component.html',
  styleUrls: ['./c-voting-search.component.css']
})
export class CVotingSearchComponent implements OnInit {

  searchResult = [];
  initive = [];
  review = [];
  vote = [];
  showAlert = false;
  @ViewChild('searchInput') searchInput: ElementRef;


  constructor(
    private router: Router,
    private zone: NgZone,
    private loading: LoadingService,
    private shareService: ShareService
  ) {  window["CVotingSearchComponent"] = this; }

  ngOnInit() {
  }

  searchList () {

    this.loading.loadingBar_show('cvList01');

    
    if (this.shareService.mobileCheck()) {
      cVotingUtil.getStorage("search", "InitiativeList");
      cVotingUtil.getStorage("search", "ReviewList");
      cVotingUtil.getStorage("search", "VoteList");
    } else {
      let searchDataList = [];
      const initive = JSON.parse(localStorage.getItem('initiativeList'));
      const review = JSON.parse(localStorage.getItem('reviewList'));
      const vote = JSON.parse(localStorage.getItem('voteList'));
  
      if (!this.shareService.nullCheck(initive) && initive.length > 0) {
        searchDataList = initive;
      }
  
      if (!this.shareService.nullCheck(review) && review.length > 0) {
        searchDataList = searchDataList.concat(review);
      }
  
      if (!this.shareService.nullCheck(vote) && vote.length > 0) {
        searchDataList = searchDataList.concat(vote);
      }
  
      if (searchDataList.length === 0) {
        this.searchResult = [
          {
            idx : 0,    // 글 번호
            subject : 'noResult',    // 제목
          }
        ];
      } else {
  
        this.searchResult =  searchDataList.filter( list => list.subject.match(this.searchInput.nativeElement.value));
  
        if (this.searchResult.length === 0) {
          this.searchResult = [
            {
              idx : 0,    // 글 번호
              subject : 'noResult',    // 제목
            }
          ];
        }
  
      }
      setTimeout(() => {
        this.loading.loadingBar_hide('cvList01');
      }, 300);
  
      console.log('searchResult >>>>>> ' + JSON.stringify( this.searchResult ));
    }  
  }

  getData(res) {

    // console.log("@@@ res getData >>>>>>>>>>>>>> ", JSON.stringify(res));
    let searchDataList = [];
    // let initive, review, vote = [];

    if (res.stored_data[0].type === 'initiative') {
      this.zone.run(()=>this.initive  = res.stored_data);
    } else if (res.stored_data[0].type === 'review') {
      this.zone.run(()=>this.review = res.stored_data);
    } else if (res.stored_data[0].type === 'vote') {
      this.zone.run(()=>this.vote = res.stored_data);
    }

    // console.log("@@@ initive >>>>>>>>>>>>>> ", JSON.stringify(this.initive));
    // console.log("@@@ review >>>>>>>>>>>>>> ", JSON.stringify(this.review));
    // console.log("@@@ vote >>>>>>>>>>>>>> ", JSON.stringify(this.vote));


    if (!this.shareService.nullCheck(this.initive) && this.initive.length > 0) {
      searchDataList = this.initive;
    }

    if (!this.shareService.nullCheck(this.review) && this.review.length > 0) {
      searchDataList = searchDataList.concat(this.review);
    }

    if (!this.shareService.nullCheck(this.vote) && this.vote.length > 0) {
      searchDataList = searchDataList.concat(this.vote);
    }

    console.log("@@@ searchDataList >>>>>>>>>>>>>> ", JSON.stringify(searchDataList));

    if (searchDataList.length === 0) {
      this.searchResult = [
        {
          idx : 0,    // 글 번호
          subject : 'noResult',    // 제목
        }
      ];
      setTimeout(() => {
        this.loading.loadingBar_hide('cvList01');
      }, 300);
    } else {

      this.zone.run(()=>this.searchResult =  searchDataList.filter( list => list.subject.match(this.searchInput.nativeElement.value)));

      if (this.searchResult.length === 0) {
        this.searchResult = [
          {
            idx : 0,    // 글 번호
            subject : 'noResult',    // 제목
          }
        ];
      }
      setTimeout(() => {
        this.loading.loadingBar_hide('cvList01');
      }, 500);
    }
  }

  handleKeyDown ($event) {

    if ($event.keyCode === 13) {
      if ($event.target.value.length >= 2) {
        this.searchList();
      } else {
        this.showAlert = true;
        this.searchInput.nativeElement.value = '';
        this.searchResult = [];
      }
    }
  }

  // 검색 상세
  searchDetail (item) {
    console.log('item >>>>>>>>>  '  +  JSON.stringify(item));

    let menu_url = '';
    if (item.type === 'initiative') {
      menu_url = 'initiative';
    } else if (item.type === 'review') {
      cVotingUtil.showDiscussionPage(item);
    } else if (item.type === 'vote') {
      menu_url = 'vote/detail';
    }
    this.zone.run(() => this.router.navigate([menu_url, { infos : JSON.stringify(item) }]));
  }

  onClickNavigateMenu (menu: string , value?: any) {
    console.log('menu >>>> ' + menu);
    console.log('length >>>> ' + value);

    switch (menu) {
      case 'back':
        history.back();
        break;
      case 'search':
        if (value.length >= 2) {
          this.searchList();
        } else {
          this.showAlert = true;
          this.searchInput.nativeElement.value = '';
          this.searchResult = [];
        }
        break;
    }
  }

}
