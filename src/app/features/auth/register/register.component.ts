import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private _auth: AuthService, private _router: Router) {}

  errMessage: string = '';
  isLoading: Boolean = false;

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z]\w{7}$/),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: this.confirmPassword }
  );

  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    if (password === rePassword) {
      return null;
    } else {
      return { mismatch: true };
    }
  }

  submit() {
    this.isLoading = true;
    console.log('errors', this.registerForm.get('name')?.errors);
    console.log('toutched', this.registerForm.get('name')?.touched);
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      this._auth.regiter(this.registerForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          console.log(res);
          if (res.message == 'success') {
            this._router.navigate(['/login']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err.error.message);
          this.errMessage = err.error.message;
        },
      });
    }

    // if (this.registerForm.valid) {
    // }
  }
}
