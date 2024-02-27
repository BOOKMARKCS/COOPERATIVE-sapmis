import {APP_ID, NgModule} from '@angular/core';
import {AngularSvgIconModule} from 'angular-svg-icon';

import {LayoutRoutingModule} from './layout-routing.module';
import {LayoutComponent} from "./layout.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {ProfileMenuComponent} from "./components/navbar/profile-menu/profile-menu.component";
import {ClickOutsideDirective} from "../../shared/directives/click-outside.directive";
import {NgClass} from "@angular/common";
import {NavbarMobileComponent} from "./components/navbar/navbar-mobile/navbar-mobilecomponent";

@NgModule({
  declarations: [LayoutComponent, ProfileMenuComponent, NavbarComponent],
  imports: [LayoutRoutingModule, AngularSvgIconModule.forRoot(), SidebarComponent, ClickOutsideDirective, NgClass, NavbarMobileComponent],
  providers: [
    // {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    // {provide: APP_ID, useValue: 'ng-cli-universal'},
    // {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
    // {provide: HttpClient, useClass: HttpService},
  ]
})
export class LayoutModule {
}
