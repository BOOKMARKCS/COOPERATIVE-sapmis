import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { Router } from "@angular/router";
import { AccountService } from "../../presentation/features/account/account.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService,private route:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.accountService.user$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${user.jwt}`
            }
          });
          console.log(this.route.url)
        }
      }
    })
    return next.handle(request);
  }
}
