import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
  name: 'enterToBr'
})

export class EnterToBrPipe implements PipeTransform {

  transform(content: string, result): string {
    if (content !== undefined && content != null && content !== '') {
      return content.replace(new RegExp('\r?\n', 'g'), '<br/>');
    } else {
      return '';
    }
  }
}
