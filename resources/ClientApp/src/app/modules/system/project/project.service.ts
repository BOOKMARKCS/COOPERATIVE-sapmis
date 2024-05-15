import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IProject } from "../../../core/models/project/project.model";
import { AuthService } from "../../../core/services/auth.service";
import { ProjectStatus, ProjectStatusItem, ProjectType } from "../../../core/models/project/project.enum";
import { IMaster } from "../../../core/models/projectDetail/project-detail.model";
import { FormArray, FormBuilder } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient, private auth: AuthService, private fb: FormBuilder) {
  }

  get = () => this.http.get<IProject[]>('project')

  store = (projectData: any) => this.http.post('project', projectData)

  show = (projectId: string) => this.http.get<IProject>(`project/${projectId}`)

  update = (project: any, projectId: any) => this.http.put(`project/${projectId}`, project)

  master = () => this.http.get<IMaster>('master-project')


  getProjectStatus(projectType: ProjectType, currentStatus: number): ProjectStatusItem | null {
    const projectStatus = ProjectStatus[projectType];
    if (projectStatus) return projectStatus[currentStatus + 1];
    return null;
  }

  patchValue(form: any, project: IProject, round = 0) {
    Object.entries(project.projectDetail).forEach(([key, value]) => {
      if (Array.isArray(value) && form.get(['projectDetail', key]) instanceof FormArray) {
        const formArray = form.get(['projectDetail', key]) as FormArray;
        formArray.clear();
        value.forEach((val: any) => formArray.push(this.fb.control(val)));
      } else if (typeof value === 'object' && !(value instanceof Array) && (form.get(['projectDetail', key]) instanceof FormArray)) form.get(['projectDetail', key]).push(this.fb.control(value))
    });
    // form.patchValue(project);
    console.log({form: form.getRawValue(), project: project});
  }

}
