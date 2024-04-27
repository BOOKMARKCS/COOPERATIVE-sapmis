import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdvisorComponent} from "./advisor.component";
import {ProjectApprovalComponent} from "./project-approval/project-approval.component";

const routes: Routes = [
  {path: '', component: AdvisorComponent},
  {path: 'approval', component: ProjectApprovalComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvisorRoutingModule {
}
