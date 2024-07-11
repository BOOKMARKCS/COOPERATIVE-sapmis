import {FormControl, FormGroup} from "@angular/forms";
import {IProjectDetail, ProjectDetail} from "../projectDetail/project-detail.model";
import {ProjectType} from "./project.enum";

export interface IProject {
  id: string
  userId: string
  academicYear: string
  preStatus : number
  status: number
  projectType: ProjectType
  projectDetail: IProjectDetail
}

export class Project {
  id = new FormControl(null)
  userId = new FormControl(null)
  academicYear = new FormControl(null)
  preStatus = new FormControl<number>(0)
  status = new FormControl<number>(0)
  projectType = new FormControl(null)
  projectDetail = new FormGroup<ProjectDetail>(new ProjectDetail())
}
