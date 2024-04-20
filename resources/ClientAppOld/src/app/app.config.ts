import {APP_ID, ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {HttpService} from "./core/services/http.service";
import {environment} from "../environments/environment";
import {authInterceptor} from "./core/interceptor/auth.interceptor";
import {apiPrefixInterceptor} from "./core/interceptor/api-prefix.interceptor";

export function removeSlash(url: string) {
  const last = url.charAt(url.length - 1);
  return last === '/' ? url.slice(0, -1) : url;
}

export function getBaseUrl() {
  return environment.production ? removeSlash(document.getElementsByTagName('base')[0].href) : environment.apiUrl;
}

export function getClientUrl() {
  return removeSlash(document.getElementsByTagName('base')[0].href);
}

const provideUrl = [
  {provide: 'CLIENT_URL', useFactory: getClientUrl, deps: []},
  {provide: 'BASE_URL', useFactory: getBaseUrl, deps: []}
];
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([apiPrefixInterceptor,authInterceptor])),
    // {provide: APP_ID, useValue: 'ng-cli-universal'},
    // {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
    {provide: HttpClient, useClass: HttpService},
    {provide: 'BASE_URL', useValue: environment.apiUrl, multi: true},

  ]
};
