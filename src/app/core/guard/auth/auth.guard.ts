import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let _auth: AuthService = inject(AuthService);
  let router = inject(Router);

  // if (_auth.userData.getValue() !== null) {
    if (_auth.userData() !== null) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
