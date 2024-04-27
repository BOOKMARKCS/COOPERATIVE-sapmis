import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndorseComponent } from "./endorse.component";
import { OrganizationalUsersListComponent } from "./organizational-users-management/organizational-users-list/organizational-users-list.component";
import { OrganizationalUsersAddComponent } from "./organizational-users-management/organizational-users-add/organizational-users-add.component";
import { OrganizationalProjectsListComponent } from "./organizational-projects/organizational-projects-list/organizational-projects-list.component";
import { OrganizationalProjectsAddComponent } from "./organizational-projects/organizational-projects-add/organizational-projects-add.component";
import { projectMaterResolver } from "../../system/project/projectResolver";

const routes: Routes = [
  {path: '', component: EndorseComponent},
  {
    path: 'users',
    children: [
      {path: 'list', component: OrganizationalUsersListComponent},
      {path: 'add', component: OrganizationalUsersAddComponent}
    ]
  },
  {
    path: 'projects',
    children: [
      {path: 'list', component: OrganizationalProjectsListComponent},
      {path: 'add', component: OrganizationalProjectsAddComponent, resolve: {master: projectMaterResolver}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EndorseRoutingModule {
}
