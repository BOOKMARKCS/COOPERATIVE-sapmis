import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token()
  if (token && token.startsWith('{') && token.endsWith('}')) {
    const access_token = JSON.parse(token).access_token
    const authReq = req.clone({headers: req.headers.append('Authorization', `Bearer ${access_token}`)})
    return next(authReq);
  } else return next(req);
};
