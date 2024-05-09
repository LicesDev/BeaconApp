import { Injectable } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { inject } from '@angular/core';

export const canActivate: CanActivateFn = () => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  return new Promise(resolve => {
    if (!authService.isAuthenticated()) {
      router.navigate(['/login']).then(() => {
        resolve(false);
      });
    } else {
      resolve(true);
    }
  });
};
