import { Component } from '@angular/core';
import { HeaderComponent } from "../layout/components/header/header.component";
import { NgForOf, NgIf } from "@angular/common";
import { ProjectService } from "./project.service";
import { IProject } from "../../../core/models/project/project.model";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [HeaderComponent, NgForOf, NgIf],
  templateUrl: './project.component.html',
})
export class ProjectComponent {
  projects: IProject[] = [];

  constructor(private ps: ProjectService) {
    this.ps.get().subscribe(p => this.projects = p)
  }
}
