import {HttpInterceptorFn} from '@angular/common/http';
import {Inject, inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token: any = inject(AuthService).getJWT();
  if (token && !req.url.includes('assets')) {
    const authReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`)
    })
    return next(authReq);
  } else {
    return next(req);
  }
};
