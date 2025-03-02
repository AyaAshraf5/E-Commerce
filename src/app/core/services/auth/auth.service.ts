import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from '../../../shared/interface/auth/auth';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // userData: BehaviorSubject<null | JwtPayload> =
  //   new BehaviorSubject<null | JwtPayload>(null);
  userData:WritableSignal<any> =signal(null);

  constructor(
    private _httpClient: HttpClient,
    @Inject(PLATFORM_ID) Id: object,
    private _router: Router
  ) {
    if (isPlatformBrowser(Id)) {
      if (localStorage.getItem('userToken') !== null) {
        this.decodeUserData();
      }
    }
  }

  regiter(formData: Auth): Observable<any> {
    return this._httpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      formData
    );
  }

  login(formData: Auth): Observable<any> {
    return this._httpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signin`,
      formData
    );
  }

  decodeUserData() {
    const token = localStorage.getItem('userToken') || '';
    const decoded = jwtDecode(token);
    this.userData.set(decoded);
    console.log(this.userData);
  }

  logOut() {
    localStorage.removeItem('userToken');
    this.userData.set(null);
    this._router.navigate(['/login']);
  }
}
