import { Pipe, Injectable, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
@Injectable()
export class FilterPipe implements PipeTransform {
  transform(items: any[], field: string, value: any): any[] {
    if (!items) {
      return [];
    }
    return items.filter((i) => i[field] === value);
  }
}
