import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectProposerRoutingModule } from './project-proposer-routing.module';
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProjectProposerRoutingModule,
    HttpClientModule
  ]
})
export class ProjectProposerModule { }
