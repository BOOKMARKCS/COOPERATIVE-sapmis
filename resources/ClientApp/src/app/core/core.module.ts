import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NotFoundComponent } from './base/components/errors/not-found/not-found.component';
import {
  ValidationMessagesComponent
} from './base/components/errors/validation-messages/validation-messages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotificationComponent } from './base/components/modals/notification/notification.component';
import { UserHasRoleDirective } from './base/directives/user-has-role.directive';
import { ModalComponent } from './base/components/modals/modal/modal.component';
import { InputComponent } from './base/components/inputs/input/input.component';
import { CardComponent } from './base/components/cards/card/card.component';
import { TextLabelComponent } from "./base/components/texts/text-label/text-label.component";
import { HeightUpdaterDirective } from './base/directives/height-updater.directive';
import { InputInLabelComponent } from './base/components/inputs/input-in-label/input-in-label.component';
import { NavBottomComponent } from "./base/components/nav-bars/nav-bottom/nav-bottom.component";
import { NavMenuComponent } from "./base/components/nav-bars/nav-menu/nav-menu.component";
import { DatepickerComponent } from './base/components/inputs/datepicker/datepicker.component';
import { ButtonComponent } from './base/components/buttons/button/button.component';
import { RadioComponent } from './base/components/inputs/radio/radio.component';
import { TableComponent } from './base/components/tables/table/table.component';
import { ConfirmComponent } from "./base/components/modals/confirm/confirm.component";
import { InputBoxComponent } from "./base/components/inputs/input-box/input-box.component";
import { CommentBoxComponent } from './base/components/modals/comment-box/comment-box.component';
import { HttpService } from "./http/http.service";
import { LoadingComponent } from './base/components/loading/loading.component';
import { ToastrModule } from "ngx-toastr";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { LazyTranslationService } from "./translate-extension/lazy-translation.service";
import { TranslateHttpLoader } from "./translate-extension/translate-http-loader";
import { NavbarComponent } from "./base/components/navbar/navbar.component";
import { SidebarComponent } from "./base/components/sidebar/sidebar.component";
import { HomeComponent } from "./base/components/home/home.component";
import { ActivatedRouteSnapshot, provideRouter, RouterModule } from "@angular/router";

export function HttpLoaderFactory(lazy: LazyTranslationService) {
  lazy.add('all');
  return new TranslateHttpLoader(lazy);
}

@NgModule({
    declarations: [
      NotFoundComponent,
      ValidationMessagesComponent,
      NotificationComponent,
      UserHasRoleDirective,
      ModalComponent,
      InputBoxComponent,
      InputComponent,
      CardComponent,
      TextLabelComponent,
      HeightUpdaterDirective,
      InputInLabelComponent,
      NavBottomComponent,
      NavMenuComponent,
      DatepickerComponent,
      ButtonComponent,
      RadioComponent,
      TableComponent,
      ConfirmComponent,
      CommentBoxComponent,
      LoadingComponent,
      NavbarComponent,
      SidebarComponent,
      HomeComponent,
    ],
    imports: [
      CommonModule,
      ReactiveFormsModule,
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
      FormsModule,
      NgOptimizedImage,
      RouterModule,
    ],
    exports: [
      ValidationMessagesComponent,
      UserHasRoleDirective,
      InputBoxComponent,
      CardComponent,
      InputComponent,
      HeightUpdaterDirective,
      InputInLabelComponent,
      NavBottomComponent,
      NavMenuComponent,
      DatepickerComponent,
      RadioComponent,
      TableComponent,
      ModalComponent,
      NotificationComponent,
      CommentBoxComponent,
      LoadingComponent,
      NavbarComponent,
      SidebarComponent,
      NotFoundComponent,
      HomeComponent
    ],
    providers: [
      {provide: HttpClient, useClass: HttpService},
    ]
  }
)
export class CoreModule {
}
