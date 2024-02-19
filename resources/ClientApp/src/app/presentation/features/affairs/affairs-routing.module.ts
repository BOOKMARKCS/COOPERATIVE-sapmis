import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AffairsComponent } from "./affairs.component";
import { UserManagementComponent } from "./user-management/user-management.component";
import { AddUserComponent } from "./user-management/add-user/add-user.component";
import { authorizationGuard } from "../../../core/base/guards/authorization.guard";

const routes: Routes = [
  {path: 'index', component: AffairsComponent},
  {
    path: 'user-management',
    children: [
      {path: '', component: UserManagementComponent},
      {path: 'add_user', component: AddUserComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AffairsRoutingModule {
}
