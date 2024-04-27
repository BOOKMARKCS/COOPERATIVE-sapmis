import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ProjectService} from "../../system/project/project.service";
import {HeaderComponent} from "../../system/layout/components/header/header.component";
import {ProjectListComponent} from "../../system/project/project-list/project-list.component";

@Component({
  selector: 'app-endorse',
  standalone: true,
  imports: [
    HeaderComponent,
    NgForOf,
    NgIf,
    ProjectListComponent
  ],
  templateUrl: './endorse.component.html',
})
export class EndorseComponent {
 projects: any;


  constructor(ps: ProjectService) {
    ps.get().subscribe(res => {
      this.projects = res
      console.log({projectEndorse:res})
    })
  }

}
