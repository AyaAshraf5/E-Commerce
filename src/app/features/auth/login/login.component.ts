import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private _auth: AuthService, private _router: Router) {}

  errMessage: string = '';
  isLoading: Boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  submit() {
    this.isLoading = true;

    if (this.loginForm.valid) {
      this._auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          console.log(res);
          if (res.message == 'success') {
            this._router.navigate(['/home']);
            localStorage.setItem('userToken', res.token);
            this._auth.decodeUserData();
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err.error.message);
          this.errMessage = err.error.message;
        },
      });
    }
  }
}
