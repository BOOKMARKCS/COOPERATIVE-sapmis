import { Component } from '@angular/core';
import { HeaderComponent } from "../../layout/components/header/header.component";
import { JsonPipe, NgForOf } from "@angular/common";
import { ProjectService } from "../project.service";
import { ActivatedRoute } from "@angular/router";
import { IProject, Project } from "../../../../core/models/project/project.model";

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    HeaderComponent,
    NgForOf,
    JsonPipe
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.sass'
})
export class ProjectDetailComponent {

  projectData: IProject | undefined;

  constructor(private psv: ProjectService, private route: ActivatedRoute) {
    this.psv.show(this.route.snapshot.params['id']).subscribe(project => this.projectData = project)
  }
}
