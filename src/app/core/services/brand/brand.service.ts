import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../constant/baseUrl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private _http: HttpClient) {}

  getAllBrands(): Observable<any> {
    return this._http.get(`${baseUrl.baseUrl}/brands`);
  }
}
