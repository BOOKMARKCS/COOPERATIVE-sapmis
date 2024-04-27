import {Component} from '@angular/core';
import {HeaderComponent} from "../../../../system/layout/components/header/header.component";
import {ProjectComponent} from "../../../../system/project/project.component";
import {ProjectParticipantComponent} from "../../../../system/project/project-add/project-participant/project-participant.component";

@Component({
  selector: 'app-organizational-projects-list',
  standalone: true,
  imports: [HeaderComponent, ProjectComponent, ProjectParticipantComponent, ProjectComponent],
  templateUrl: './organizational-projects-list.component.html',
})
export class OrganizationalProjectsListComponent {

}
