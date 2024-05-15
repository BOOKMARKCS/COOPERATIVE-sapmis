import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResponsibleComponent } from "./responsible.component";
import { ProjectEditComponent } from "../../system/project/project-edit/project-edit.component";
import { projectMaterResolver } from "../../system/project/projectResolver";

const routes: Routes = [
  {path: '', component: ResponsibleComponent},
  {path: 'edit-project', component: ProjectEditComponent, resolve: {master: projectMaterResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsibleRoutingModule {
}
