import { APP_ID, isDevMode, NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from "./core/core.module";
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withFetch } from "@angular/common/http";
import { JwtInterceptor } from "./core/base/interceptors/jwt.interceptor";
import { LoggingInterceptor } from "./core/http/logging.interceptor";
import { HttpService } from "./core/http/http.service";
import { environment } from "../environments/environment";
import { ServiceWorkerModule } from "@angular/service-worker";
import { provideAnimations } from "@angular/platform-browser/animations";
import { ActivatedRouteSnapshot, provideRouter, Router, RouterModule, RouterOutlet } from "@angular/router";
import { authorizationGuard } from "./core/base/guards/authorization.guard";

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

const providers = [
  {provide: 'CLIENT_URL', useFactory: getClientUrl, deps: []},
  {provide: 'BASE_URL', useFactory: getBaseUrl, deps: []}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    CoreModule,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(withFetch()),
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: APP_ID, useValue: 'ng-cli-universal'},
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
    {provide: HttpClient, useClass: HttpService},
    providers,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
