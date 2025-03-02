import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const checkTokenGuard: CanActivateFn = (route, state) => {
  let _auth: AuthService = inject(AuthService);
  let router = inject(Router);

  // if (_auth.userData.getValue() == null) {
    if (_auth.userData() == null) {
    return true;
  }
  router.navigate(['/home']);
  return false;
};
