import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { environment } from "../environments/environment";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { apiPrefixInterceptor } from "./core/interceptor/api-prefix.interceptor";
import { authInterceptor } from "./core/interceptor/auth.interceptor";
import { errorHandlerInterceptor } from "./core/interceptor/error-handler.interceptor";
import { provideAnimations } from "@angular/platform-browser/animations";

export function removeSlash(url: string) {
  const last = url.charAt(url.length - 1);
  return last === '/' ? url.slice(0, -1) : url;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([apiPrefixInterceptor, authInterceptor, errorHandlerInterceptor])),
    { provide: 'BASE_URL', useValue: environment.production ? removeSlash(document.getElementsByTagName('base')[0].href) : environment.apiUrl }
  ]
};
