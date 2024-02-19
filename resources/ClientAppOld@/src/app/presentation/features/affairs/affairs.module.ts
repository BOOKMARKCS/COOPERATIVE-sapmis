import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AffairsRoutingModule } from './affairs-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { UserManagementComponent } from "./user-management/user-management.component";
import { UserManagementService } from "./user-management/user-management.service";


@NgModule({
  declarations: [UserManagementComponent],
  imports: [
    CommonModule,
    AffairsRoutingModule,
    HttpClientModule
  ],
  providers: [UserManagementService]
})
export class AffairsModule { }
