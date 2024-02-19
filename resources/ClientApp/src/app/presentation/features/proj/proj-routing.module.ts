import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProjectComponent } from "./project/edit-project/edit-project.component";
import { projResolver } from "./proj.resolver";
import { ApprovalComponent } from "./project/approval/approval.component";
import { EditReportResultsComponent } from "./project-results-report/edit-report-results/edit-report-results.component";
import { ApprovalReportComponent } from "./project-results-report/approval-report/approval-report.component";

const routes: Routes = [
  {path: 'edit-project', component: EditProjectComponent, resolve: {getForm:projResolver}},
  {path: 'approval', component: ApprovalComponent, resolve: {getForm:projResolver}},
  {path: 'edit-report-results', component: EditReportResultsComponent},
  {path: 'approval-report', component: ApprovalReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjRoutingModule { }
