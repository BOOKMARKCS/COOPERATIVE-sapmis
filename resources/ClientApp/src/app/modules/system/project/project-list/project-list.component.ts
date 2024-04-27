import { Component } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import { ProjectService } from "../project.service";
import { SvgIconComponent } from "../../../../shared/components/svg-icon/svg-icon.component";
import { IProject } from "../../../../core/models/project/project.model";

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [NgForOf, NgIf, SvgIconComponent],
  templateUrl: './project-list.component.html',
})
export class ProjectListComponent {
  projects?: IProject[] = [];

  constructor(private ps: ProjectService) {
    this.ps.get().subscribe(p => this.projects = p)
  }
}
