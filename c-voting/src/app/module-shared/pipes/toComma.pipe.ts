import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
  name: 'toComma'
})

export class ToCommaPipe implements PipeTransform {

  transform(value: string, result): string {
    if (value !== undefined && value != null && value !== '') {
        let strNum = value.toString().replace(/[^0-9.-]/gi, "") + "";
        let sign = '';
        let decimal = '';

        const numSplit = strNum.split(".");

        if (numSplit.length === 2){
            strNum = numSplit[0];
            decimal = numSplit[1];
        }
        if (strNum.length > 1 && (strNum.substring(0, 1))) {
            sign = strNum.substring(0, 1);
            if (sign !== "-" && sign !== "+") {
                sign = '';
            } else {
                strNum = strNum.substring(1, strNum.length);
            }
        }

        const splitPoint = strNum.length % 3 !== 0 ? strNum.length % 3 : 3;
        const firstNum = strNum.substring(0, splitPoint);
        const elseNum =  strNum.substring(splitPoint);
        const won = firstNum + elseNum.replace(/([0-9]{3})/g, ",$1");
        if (decimal !== '') {
        decimal = '.' + decimal;
        }

        return sign + won + decimal;
    } else {
      return '';
    }
  }
}