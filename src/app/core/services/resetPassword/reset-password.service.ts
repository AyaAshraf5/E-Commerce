import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../../../shared/interface/auth/auth';
import { baseUrl } from '../../constant/baseUrl';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  constructor(private _httpClient: HttpClient) {}

  verifyEmail(payloadd: Auth): Observable<any> {
    return this._httpClient.post(
      `${baseUrl.baseUrl}/auth/forgotPasswords`,
      payloadd
    );
  }

  verifyCode(payloadd: Auth): Observable<any> {
    return this._httpClient.post(
      `${baseUrl.baseUrl}/auth/verifyResetCode`,
      payloadd
    );
  }

  resetPassword(payloadd: Auth): Observable<any> {
    return this._httpClient.put(
      `${baseUrl.baseUrl}/auth/resetPassword`,
      payloadd
    );
  }
}
