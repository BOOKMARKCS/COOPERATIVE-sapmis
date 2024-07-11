import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { apiPrefixInterceptor } from "./core/interceptor/api-prefix.interceptor";
import { authInterceptor } from "./core/interceptor/auth.interceptor";
import { errorHandlerInterceptor } from "./core/interceptor/error-handler.interceptor";
import { provideAnimations } from "@angular/platform-browser/animations";
import { AuthService } from "./core/services/auth.service";

export const initializeApp = (authService: AuthService) => () => authService.loadUserFromLocalStorage();

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([apiPrefixInterceptor, authInterceptor, errorHandlerInterceptor])),
    {provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AuthService], multi: true},
  ]
};
