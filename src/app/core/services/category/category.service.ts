import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../constant/baseUrl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private htttp: HttpClient) {}
  getAllCategory(): Observable<any> {
    return this.htttp.get(`${baseUrl.baseUrl}/categories`);
  }
}
