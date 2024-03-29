import { Inject, Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoadingService } from "../base/components/loading/loading.service";
import { MessageService } from "../message.service";

export type HandledError = {
   status:number;
   message:string;
}
export interface ErrorModel {
  code: string,
  parameters: string[]
}
/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private message: MessageService, private loading: LoadingService, @Inject('BASE_URL') private baseUrl: string) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const reg = new RegExp(this.baseUrl);
    if (reg.test(request.url)) {
      return next.handle(request).pipe(catchError(error => this.handleError(error)));
    } else return next.handle(request);
  }

  // Customize the default error handler here if needed
  private handleError(errorResponse: HttpErrorResponse): Observable<HttpEvent<any>> {
    this.loading.forceHide();
    if (errorResponse.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      this.message.error(errorResponse.message);
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      this.handleBackendError(errorResponse);
    }

    const errer:HandledError = { status:errorResponse.status,message:errorResponse.message }
    return  throwError(()=> errer);
  }

  private handleBackendError(errorResponse: HttpErrorResponse) {
    switch (errorResponse.status) {
      case 403: this.message.warning(`You don't have access to the url : ${errorResponse.url}`);
        break;
      case 401: this.message.warning(`You don't have access to the content`);
        break;
      case 500: this.message.error(errorResponse.error.code);
        break;
      case 504: this.message.error('Gateway Timeout');
        break;
      case 400:
      case 404:
        const backendError = errorResponse.error;
        if (!backendError.code && errorResponse.status == 404) {
          this.message.error(`The requested URL(${errorResponse.url}) was not found on this server`);
        }
        else if (backendError.errors) {
          if (backendError.single) {
            forkJoin((backendError.errors as ErrorModel[]).map((item: ErrorModel) => this.message.translatedMessage(item.code, item.parameters))).subscribe((translates: string[]) => {
              this.message.errorConcat(translates.join("<br>"));
            })
          }
          else (backendError.errors as ErrorModel[]).forEach((item: ErrorModel | string) => {
            if (typeof item === 'object') this.message.error(item.code, item.parameters)
            else {
              let errorMessage = item as string;
              this.message.error(errorMessage);
            }
          });
        }
        else if (backendError.code) {
          this.message.error(backendError.code, backendError.parameters);
        }
        else if((backendError as string).includes('code')){
          const message = JSON.parse(backendError);
          this.message.error(message.code, message.parameters);
        }
        else this.message.error(backendError);
        break;
    }
  }

}
