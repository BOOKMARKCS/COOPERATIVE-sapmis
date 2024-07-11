// noinspection JSIgnoredPromiseFromCall

import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError } from "rxjs";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const asv = inject(AuthService)
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err) {
        switch (err.status) {
          case 401:
            asv.logout().then(() => window.location.href = 'auth/sign-in');
            break;
          case 419:
            asv.logout().then(() => window.location.href = 'auth/sign-in');
            break;
        }
      }
      console.log({err})
      throw err
    })
  );
};
