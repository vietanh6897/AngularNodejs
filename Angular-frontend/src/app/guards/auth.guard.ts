import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  return localStorage.getItem('access_token')
    ? true
    : router.navigate(['/login']);
};
