import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndorseComponent } from "./endorse.component";
import { OrganizationalUsersListComponent } from "./organizational-users-management/organizational-users-list/organizational-users-list.component";
import { OrganizationalUsersAddComponent } from "./organizational-users-management/organizational-users-add/organizational-users-add.component";
import { projectMaterResolver } from "../../system/project/projectResolver";
import { ProjectAddComponent } from "../../system/project/project-add/project-add.component";
import { ProjectListComponent } from "../../system/project/project-list/project-list.component";

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
      {path: 'list', component: ProjectListComponent},
      {path: 'add', component: ProjectAddComponent, resolve: {master: projectMaterResolver}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EndorseRoutingModule {
}
