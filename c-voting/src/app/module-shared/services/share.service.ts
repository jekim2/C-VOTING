import { Injectable } from '@angular/core';

@Injectable()
export class ShareService {

  constructor() { }

  nullCheck (data: any) {
    let check: boolean;
    if (data === 'null' || data ===  undefined || data ===   null ||  data ===  ' ' || data === '' ) {
      check = true;
    } else {
      check = false;
    }
    return check;
  }

}
