import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjRoutingModule } from './proj-routing.module';
import { EditProjectComponent } from './project/edit-project/edit-project.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditReportResultsComponent } from './project-results-report/edit-report-results/edit-report-results.component';
import { ApprovalReportComponent } from './project-results-report/approval-report/approval-report.component';
import { CoreModule } from "../../../core/core.module";
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [
    EditProjectComponent,
    EditReportResultsComponent,
    ApprovalReportComponent,
  ],
  imports: [
    CommonModule,
    ProjRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class ProjModule {
}
