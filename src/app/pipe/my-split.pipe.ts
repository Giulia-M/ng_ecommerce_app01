import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mySplit',
})
export class MySplitPipe implements PipeTransform {
  transform(
    value: string,
    limit = 25,
    completeWords = false,
    ellipsis = '...'
  ) {
    if (completeWords) {
      limit = value.substring(0, limit).lastIndexOf(' ');
    }
    return value.length > limit ? value.substring(0, limit) + ellipsis : value;
  }
}
