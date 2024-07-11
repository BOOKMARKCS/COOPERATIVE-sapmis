import { Component, EventEmitter, Input, Output } from '@angular/core';
import { JsonPipe, NgForOf, NgIf } from "@angular/common";
import { ProjectService } from "../project.service";
import { SvgIconComponent } from "../../../../shared/components/svg-icon/svg-icon.component";
import { IProject } from "../../../../core/models/project/project.model";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ProjectStatus } from "../../../../core/models/project/project.enum";
import { HeaderComponent } from "../../layout/components/header/header.component";
import { IMaster } from "../../../../core/models/projectDetail/project-detail.model";
import { projectListResolver } from "../projectResolver";

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [NgForOf, NgIf, SvgIconComponent, ButtonComponent, RouterLink, JsonPipe, HeaderComponent],
  templateUrl: './project-list.component.html',
})
export class ProjectListComponent {
  @Input() owner: boolean = false;

  @Output() projectSelected = new EventEmitter<IProject>();
  projects?: IProject[] = [];

  constructor(route: ActivatedRoute) {
     this.projects = route.snapshot.data['list']
  }

  protected readonly ProjectStatus = ProjectStatus;
}
