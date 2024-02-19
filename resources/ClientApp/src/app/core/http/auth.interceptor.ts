import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from "../authentication/auth.service";

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: any = this.authService.getJWT();
    if (token) {
      const authReq = req.clone({
        headers: req.headers.append('Authorization', `Bearer ${token}`)
      })
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
