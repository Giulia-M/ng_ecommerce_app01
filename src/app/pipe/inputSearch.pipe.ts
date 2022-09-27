import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filterByArea',
})
export class FilterByStatusPipe implements PipeTransform {
  /*
  transform(products: any, areaname: string): any[] {
    if (areaname) {
      return products.filter((listing: any) => listing.title === areaname);
    }
    return products;
  }

  */

  transform(list: any[], filterText: string): any {
    return list
      ? list.filter(
          (item) => item.title.search(new RegExp(filterText, 'i')) > -1
        )
      : [];
  }
}
