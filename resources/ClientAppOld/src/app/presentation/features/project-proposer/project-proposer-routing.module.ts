import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectProposerComponent } from "./project-proposer.component";

const routes: Routes = [
  {path:'',component:ProjectProposerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectProposerRoutingModule { }
