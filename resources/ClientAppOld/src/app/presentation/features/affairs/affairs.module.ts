import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AffairsRoutingModule } from './affairs-routing.module';
import { UserManagementComponent } from "./user-management/user-management.component";
import { UserManagementService } from "./user-management/user-management.service";
import { HttpClientModule } from "@angular/common/http";
import { ActivatedRouteSnapshot, RouterModule } from "@angular/router";
import { AddUserComponent } from "./user-management/add-user/add-user.component";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [UserManagementComponent, AddUserComponent],
  imports: [
    CommonModule,
    AffairsRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [UserManagementService]
})
export class AffairsModule { }
