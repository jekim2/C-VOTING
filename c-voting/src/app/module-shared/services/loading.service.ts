import { Injectable } from '@angular/core';

declare var $: any;

@Injectable()
export class LoadingService {

  constructor() { }

  // loadingbar show
  loadingBar_show(classes: string) {
    $('.' + classes).addClass('cv_cont_loading');
  }

  // loadingbar hide
  loadingBar_hide(classes: string) {
    $('.' + classes).removeClass('cv_cont_loading');
  }

}
