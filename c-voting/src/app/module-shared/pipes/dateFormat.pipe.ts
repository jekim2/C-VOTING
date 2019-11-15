import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
  name: 'dateFormat'
})

export class EnterFormatPipe implements PipeTransform {

  transform(date: string, type: string): string {
    let getDate, formatDate, year, month, day, hour, min = '';
    if (date !== undefined && date != null && date !== '') {
        switch (type) {
            case 'mmddhhss' :
                getDate = date.substr(4, 8);
                month = getDate.substr(0, 2);
                day = getDate.substr(2, 2);
                hour = getDate.substr(4, 2);
                min = getDate.substr(6, 2);

                formatDate = month + '/' + day + ' ' + hour + ':' + min;
                break;

            case 'yyyy.mm.dd' :
                getDate  = date.substr(0, 8);
                year = getDate.substr(0, 4);
                month = getDate.substr(4, 2);
                day = getDate.substr(6, 2);

                formatDate = year + '.' + month + '.' + day;
                break;

            default:
                break;
        }
        console.log('@@@ formatDate >>> ' + formatDate);
        return formatDate;
    } else {
      return '';
    }
  }
}
