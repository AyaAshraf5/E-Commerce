import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../interface/products/products';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(products: Products[], searchVValue: string): Products[] {
    return products.filter((product) => {
      return product.title?.toUpperCase().includes(searchVValue?.toUpperCase());
    });
  }
}
