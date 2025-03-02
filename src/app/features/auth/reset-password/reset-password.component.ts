import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ResetPasswordService } from '../../../core/services/resetPassword/reset-password.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  constructor(
    private _reset: ResetPasswordService,
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {}

  steps: number = 1;
  sendEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  submitEmail() {
    this._reset.verifyEmail(this.sendEmail.value).subscribe({
      next: (res) => {
        if (res.statusMsg == 'success') {
          this.steps = 2;
          this.toastr.success(res.message, 'success', {
            closeButton: true,
            progressBar: true,
            progressAnimation: 'increasing',
            timeOut: 2000,
          });
        }
      },
    });
  }

  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6}$/),
    ]),
  });
  submitCode() {
    this._reset.verifyCode(this.verifyCode.value).subscribe({
      next: (res) => {
        if (res.status == 'Success') {
          this.steps = 3;
          this.toastr.success(res.message, 'success', {
            closeButton: true,
            progressBar: true,
            progressAnimation: 'increasing',
            timeOut: 2000,
          });
        }
      },
    });
  }

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required]),
  });
  submitPassword() {
    this._reset.resetPassword(this.resetPassword.value).subscribe({
      next: (res) => {
        if (res.token) {
          localStorage.setItem('userToken', res.token);
          this.auth.decodeUserData()
          this.router.navigate(['/home'])
        }
      },
    });
  }
}
