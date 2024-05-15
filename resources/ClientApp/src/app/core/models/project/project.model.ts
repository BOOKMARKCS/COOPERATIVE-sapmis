import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { IProjectDetail, ProjectDetail } from "../projectDetail/project-detail.model";
import { ProjectType } from "./project.enum";

export interface IProject {
  id: string
  userId: string
  academicYear: string
  status: number
  projectType: ProjectType
  projectDetail: IProjectDetail
}

export class Project {
  id = new FormControl(null)
  userId = new FormControl(null)
  academicYear = new FormControl(null)
  status = new FormControl(null)
  projectType = new FormControl(null)
  projectDetail = new FormGroup(new ProjectDetail())
}
