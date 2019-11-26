import { Injectable } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { Router } from '@angular/router';

@Injectable()
export class ShareService {

  constructor(private location: PlatformLocation, private router: Router) { }

  nullCheck (data: any) {
    let check: boolean;
    if (data === 'null' || data ===  undefined || data ===   null ||  data ===  ' ' || data === '' ) {
      check = true;
    } else {
      check = false;
    }
    return check;
  }

  mobileCheck() {
    let check: boolean;
    const filter = 'win16 | win32 | win64 | mac | macintel';
    if ( navigator.platform ) {
      if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) {
        check = true;
      } else {
        check = false;
      }
  }
  return check;
}

  onClickBackButton (type?: string) {

    const that = this;
    if (this.nullCheck(type)) {
      type = "main";
    }
    this.location.onPopState(() => {
      this.router.navigate([type]);
    });
  }

}
