import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "./base/components/sidebar/sidebar.component";
import { NavbarComponent } from "./base/components/navbar/navbar.component";
import { RouterLink, RouterModule } from "@angular/router";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { ToastrModule } from "ngx-toastr";
import { LazyTranslationService } from "./translate-extension/lazy-translation.service";
import { TranslateHttpLoader } from "./translate-extension/translate-http-loader";
import { HttpService } from "./http/http.service";
import { HttpClient } from "@angular/common/http";

export function HttpLoaderFactory(lazy: LazyTranslationService) {
  lazy.add('all');
  return new TranslateHttpLoader(lazy);
}

@NgModule({
  declarations: [SidebarComponent, NavbarComponent],
  exports: [
    SidebarComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    ToastrModule.forRoot({
      timeOut: 3000,
      extendedTimeOut: 2000,
      progressBar: true,
      newestOnTop: false
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [LazyTranslationService]
      }
    }),
  ],
  providers: [
    {provide: HttpClient, useClass: HttpService}
  ]
})
export class CoreModule { }
