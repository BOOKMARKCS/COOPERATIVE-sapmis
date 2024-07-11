import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResponsibleComponent } from "./responsible.component";
import { ProjectEditComponent } from "../../system/project/project-edit/project-edit.component";
import { projectMaterResolver } from "../../system/project/projectResolver";
import { ProjectDetailComponent } from "../../system/project/project-detail/project-detail.component";
import { ProjectListComponent } from "../../system/project/project-list/project-list.component";
import { ProjectAddComponent } from "../../system/project/project-add/project-add.component";

const routes: Routes = [
  {path: '', component: ResponsibleComponent},
  {
    path: 'projects',
    children: [
      {path: 'list', component: ProjectListComponent},
      {path: 'detail', component: ProjectDetailComponent},
      {path: 'edit', component: ProjectEditComponent, resolve: {master: projectMaterResolver}},
      // {path: 'list', component: ProjectListComponent},
      // {path: 'add', component: ProjectAddComponent, resolve: {master: projectMaterResolver}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsibleRoutingModule {

}

