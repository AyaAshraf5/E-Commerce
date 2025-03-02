import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _httpClient: HttpClient) {}
  getProdycts(): Observable<any> {
    return this._httpClient.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
  }
  getSepecificProduct(id:string): Observable<any> {
    return this._httpClient.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }

  // getPrerenderParams(): Promise<{ id: string }[]> {
  //   return this.getProdycts().toPromise().then((products) => {
  //     return products.map((product:any) => ({ id: product.id }));
  //   });
  // }
}
