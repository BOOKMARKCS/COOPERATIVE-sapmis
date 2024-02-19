import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
    responseCache = new Map();

    constructor() { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const cache = this.responseCache.get(request.urlWithParams);
        const isLocalhost: boolean = request.url.includes('localhost:5001');
        if (cache && !request.body) return of(cache)
        return next.handle(request).pipe(tap(response => isLocalhost && this.responseCache.set(request.urlWithParams, response)));
    }
}
