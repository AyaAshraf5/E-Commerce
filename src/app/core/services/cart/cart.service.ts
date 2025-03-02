import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../../constant/baseUrl';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  token: any;
  cartNumber: BehaviorSubject<any> = new BehaviorSubject<any>(0);

  constructor(
    private _httpClient: HttpClient,
    @Inject(PLATFORM_ID) Id: object
  ) {
    if (isPlatformBrowser(Id)) {
      // this.token = { token: localStorage.getItem('userToken') || '' };
      this.token = localStorage.getItem('userToken');
      console.log(this.token);
    }

    this.getProductToCart().subscribe({
      next: (res) => {
        this.cartNumber.next(res.numOfCartItems);
      },
    });

  }

  addProductToCart(productId: string): Observable<any> {
    return this._httpClient.post(
      `${baseUrl.baseUrl}/cart`,
      {
        productId: productId,
      }
      // {
      //   headers: this.token,
      // }
    );
  }

  getProductToCart(): Observable<any> {
    return this._httpClient.get(
      `https://ecommerce.routemisr.com/api/v1/cart`
      //    {
      //   headers: this.token,
      // }
    );
  }

  updateProductToCart(productId: string, count: number): Observable<any> {
    return this._httpClient.put(
      `${baseUrl.baseUrl}/cart/${productId}`,
      {
        count: count,
      }
      // {
      //   headers: this.token,
      // }
    );
  }

  removeProductToCart(productId: string): Observable<any> {
    return this._httpClient.delete(
      `${baseUrl.baseUrl}/cart/${productId}`
      //   {
      //   headers: this.token,
      // }
    );
  }

  clearProduct(): Observable<any> {
    return this._httpClient.delete(
      `${baseUrl.baseUrl}/cart`
      //   {
      //   headers: this.token,
      // }
    );
  }

  checkOut(cartID: any, payload: any): Observable<any> {
    return this._httpClient.post(
      `${baseUrl.baseUrl}/orders/checkout-session/${cartID}?url=http://localhost:4200/`,
      {
        shippingAddress: payload,
      }
      // {
      //   headers: this.token,
      // }
    );
  }
}
