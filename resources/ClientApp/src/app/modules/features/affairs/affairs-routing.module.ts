import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from "./users/add-user/add-user.component";
import { UsersComponent } from "./users/users.component";
import { ProjectDetailComponent } from "../../system/project/project-detail/project-detail.component";
import { ProjectListComponent } from "../../system/project/project-list/project-list.component";
import { projectListResolver } from "../../system/project/projectResolver";
import { userListResolver } from "../../system/user/user.resolver";
import { OrganizationComponent } from "./organization-settings/organization/organization.component";
import { PositionComponent } from "./organization-settings/position/position.component";
import { ClubComponent } from "./organization-settings/club/club.component";

const routes: Routes = [
  {path: '', component: ProjectListComponent, resolve: {list: projectListResolver}},
  {
    path: 'users',
    children: [
      {path: '', component: UsersComponent, resolve: {list: userListResolver}},
      {path: 'add', component: AddUserComponent},
    ]
  },
  {path: 'project-detail', component: ProjectDetailComponent},
  {
    path: 'organization-settings',
    children: [
      {path: 'organization', component: OrganizationComponent},
      {path: 'position', component: PositionComponent},
      {path: 'club', component: ClubComponent}
    ]
  },
  {path: '**', redirectTo: 'errors/404'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AffairsRoutingModule {
}
