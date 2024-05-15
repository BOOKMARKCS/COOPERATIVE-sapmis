import { Component, EventEmitter, Output } from '@angular/core';
import { JsonPipe, NgForOf, NgIf } from "@angular/common";
import { ProjectService } from "../project.service";
import { SvgIconComponent } from "../../../../shared/components/svg-icon/svg-icon.component";
import { IProject } from "../../../../core/models/project/project.model";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { RouterLink } from "@angular/router";
import { ProjectStatus } from "../../../../core/models/project/project.enum";

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [NgForOf, NgIf, SvgIconComponent, ButtonComponent, RouterLink, JsonPipe],
  templateUrl: './project-list.component.html',
})
export class ProjectListComponent {
  @Output() projectSelected = new EventEmitter<IProject>();
  projects?: IProject[] = [];
  // actionOptions: any = {
  //   [ProjectStatus.StudentClub.ResponsibleEdit.id]: [{actionName: 'แก้ไขข้อมูล', tone: 'card'}],
  //   [ProjectStatus.StudentClub.Draft.id]: [{actionName: 'แก้ไขข้อมูล', route: '/responsible/edit-project', tone: 'card'}],
  //   [ProjectStatus.StudentClub.AdvisorEndorse.id]: [{actionName: 'ตรวจสอบ', tone: 'card'}],
  //   [ProjectStatus.StudentClub.StudentClubEndorse.id]: [{actionName: 'ตรวจสอบ', tone: 'card'}],
  //   [ProjectStatus.StudentClub.StudentClubAdvisorEndorse.id]: [{actionName: 'ตรวจสอบ', tone: 'card'}],
  //   [ProjectStatus.StudentClub.StudentOrganizationEndorse.id]: [{actionName: 'ตรวจสอบ', tone: 'card'}],
  //   [ProjectStatus.StudentClub.StudentCouncilEndorse.id]: [{actionName: 'ตรวจสอบ', tone: 'card'}],
  //   [ProjectStatus.StudentClub.StudentAffairsEndorse.id]: [{actionName: 'ตรวจสอบ', tone: 'card'}],
  //   [ProjectStatus.StudentClub.FacultyOfficeEndorse.id]: [{actionName: 'ตรวจสอบ', tone: 'card'}],
  //   [ProjectStatus.StudentClub.DeputyDeanEndorse.id]: [{actionName: 'ตรวจสอบ', tone: 'card'}],
  //   [ProjectStatus.StudentClub.AssistantDeanEndorse.id]: [{actionName: 'ตรวจสอบ', tone: 'card'}],
  //   [ProjectStatus.StudentClub.DeanApprovalApprove.id]: [{actionName: 'ตรวจสอบ', tone: 'card'}],
  // }

  constructor(private ps: ProjectService) {
    this.ps.get().subscribe(p => this.projects = p)
  }

  protected readonly ProjectStatus = ProjectStatus;
  protected readonly parseInt = parseInt;
}
