import {Component} from '@angular/core';
import {JsonPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {UserService} from "../../system/user/user.service";
import {ProjectService} from "../../system/project/project.service";
import {HeaderComponent} from "../../system/layout/components/header/header.component";
import {ProjectComponent} from "../../system/project/project.component";
import { ProjectListComponent } from "../../system/project/project-list/project-list.component";

@Component({
  selector: 'app-affairs',
  standalone: true,
  imports: [
    HeaderComponent,
    NgIf,
    NgForOf,
    NgOptimizedImage,
    RouterLink,
    JsonPipe,
    ProjectComponent,
    ProjectListComponent,
  ],
  templateUrl: './affairs.component.html',
})
export class AffairsComponent {
  users: any
  projects: any

  constructor(usv: UserService, psv: ProjectService) {
    usv.get().subscribe(u => this.users = u)
    psv.get().subscribe(p => {
      this.projects = p
      console.log({p})
    })
  }

}
