import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { finalize } from 'rxjs/operators';
import {LoadingService} from "../services/loading.service";

/**
 * Block UI when requesting`.
 */
@Injectable({
    providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor {
    constructor(public ls: LoadingService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.ls.show();
        return next.handle(request).pipe(
            finalize(() => this.ls.hide())
        );
    }
}
