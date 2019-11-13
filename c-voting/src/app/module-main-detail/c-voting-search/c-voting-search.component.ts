import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { LoadingService } from '../../module-shared/services/loading.service';
import { ShareService } from '../../module-shared/services/share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-c-voting-search',
  templateUrl: './c-voting-search.component.html',
  styleUrls: ['./c-voting-search.component.css']
})
export class CVotingSearchComponent implements OnInit {

  searchResult = [];
  showAlert = false;
  @ViewChild('searchInput') searchInput: ElementRef;


  constructor(
    private router: Router,
    private zone: NgZone,
    private loading: LoadingService,
    private shareService: ShareService
  ) { }

  ngOnInit() {
  }

  searchList () {

    this.loading.loadingBar_show('cvList01');

    let searchDataList = [];

    const initive = JSON.parse(localStorage.getItem('initiativeList'));
    const review = JSON.parse(localStorage.getItem('reviewList'));
    const vote = JSON.parse(localStorage.getItem('voteList'));

    // console.log('initive ?>>>>>>>>>>>>> ' + JSON.stringify(initive));
    // console.log('review ?>>>>>>>>>>>>> ' + JSON.stringify(review));
    // console.log('vote ?>>>>>>>>>>>>> ' + JSON.stringify(vote));

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

    } else if (item.type === 'vote') {
      menu_url = 'vote';
    }
    this.zone.run(() => this.router.navigate([menu_url, item]));
  }

  onClickNavigateMenu (menu: string , value?: any) {
    console.log('menu >>>> ' + menu);
    console.log('length >>>> ' + value);

    // this.selected_menu = menu;
    // this.router.navigate([menu]);

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
