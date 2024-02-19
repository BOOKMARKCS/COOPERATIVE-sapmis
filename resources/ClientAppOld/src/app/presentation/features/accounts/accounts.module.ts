import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsService } from "./accounts.service";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    AccountsRoutingModule,
  ],
})
export class AccountsModule {
}
