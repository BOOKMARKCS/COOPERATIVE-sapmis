import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ProjectDetail } from "../projectDetail/project-detail.model";

export enum ProjectType {
  StudentClub = 'StudentClub',
  Club = 'Club',
  OrganizationAndCouncil = 'OrganizationAndCouncil'
}

export enum ProjectStatus {
  Draft = 'รอผู้รับผิดชอบส่งคำขอ',
  Responsible = 'รอผู้รับผิดชอบแก้ไข',
  AdvisorEndorse = 'รอที่ปรึกษาเห็นชอบ',
  StudentClubEndorse = 'รอโสมรนิสิตเห็นชอบ',
  StudentClubAdvisorEndorse = 'รอที่ปรึกษาสโมสรนิสิตเห็นชอบ',
  StudentOrganizationEndorse = 'รอองค์การนิสิตเห็นชอบ',
  StudentCouncilEndorse = 'รอสภานิสิตเห็นชอบ',
  StudentAffairsEndorse = 'รอกิจการนิสิตเห็นชอบ',
  FacultyOfficeEndorse = 'รอสำนักงานคณะเห็นชอบ',
  DeputyDeanEndorse = 'รอรองคณบดีเห็นชอบ',
  AssistantDeanEndorse = 'รอผู้ช่วยคณบดีเห็นชอบ',
  DeanApprovalApprove = 'รอคณบดีอนุมัติ',
}

export interface IProject {
  id: string
  userId: string
  academicYear: string
  status: string
  projectType: string
  projectDetails: ProjectDetail[]
}

export class Project {
  id = new FormControl(null)
  userId = new FormControl(null)
  academicYear = new FormControl(null)
  status = new FormControl(null)
  projectType = new FormControl(null)
  projectDetails = new FormArray([new FormGroup(new ProjectDetail())])
}
