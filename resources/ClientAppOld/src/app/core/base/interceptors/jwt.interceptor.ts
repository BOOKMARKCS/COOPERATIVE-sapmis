import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AccountService } from "../../../presentation/features/account/account.service";
import { Router } from "@angular/router";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.accountService.user$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${user}`
            }
          });
        }
      }
    })
    return next.handle(request);
  }
}
