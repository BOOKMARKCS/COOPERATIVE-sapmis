import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountService } from "./account.service";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";


@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [AccountService]
})
export class AccountModule {
}
