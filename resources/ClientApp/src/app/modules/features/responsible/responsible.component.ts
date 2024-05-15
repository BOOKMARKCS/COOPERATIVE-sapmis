import { Component } from '@angular/core';
import {HeaderComponent} from "../../system/layout/components/header/header.component";
import {NgForOf, NgIf} from "@angular/common";
import {ProjectService} from "../../system/project/project.service";
import { RouterOutlet} from "@angular/router";
import { ProjectListComponent } from "../../system/project/project-list/project-list.component";
import { IProject } from "../../../core/models/project/project.model";

@Component({
  selector: 'app-responsible',
  standalone: true,
  imports: [
    HeaderComponent,
    NgForOf,
    NgIf,
    RouterOutlet,
    ProjectListComponent
  ],
  templateUrl: './responsible.component.html',
})
export class ResponsibleComponent {
  projects: any;
  projectDetail : any;

  constructor(private psv: ProjectService) {
    this.psv.get().subscribe(p => {
      this.projects = p
      console.log({p})
    })
  }

  onProjectSelected($event: IProject) {
    console.log({event:$event})
  }
}
