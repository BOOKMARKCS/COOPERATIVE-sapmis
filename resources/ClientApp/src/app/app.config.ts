import { ApplicationConfig, ViewContainerRef } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { environment } from "../environments/environment";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { apiPrefixInterceptor } from "./core/interceptor/api-prefix.interceptor";
import { authInterceptor } from "./core/interceptor/auth.interceptor";
import { errorHandlerInterceptor } from "./core/interceptor/error-handler.interceptor";
import { AlertService } from "./shared/components/alert/alert.service";

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
    provideHttpClient(withFetch(), withInterceptors([apiPrefixInterceptor, authInterceptor, errorHandlerInterceptor])),
    provideUrl,
  ]
};
