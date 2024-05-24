import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IProject } from "../../../core/models/project/project.model";
import { AuthService } from "../../../core/services/auth.service";
import { ProjectStatus, ProjectStatusItem, ProjectType } from "../../../core/models/project/project.enum";
import { IMaster } from "../../../core/models/projectDetail/project-detail.model";
import { AbstractControl, FormArray, FormBuilder, FormGroup } from "@angular/forms";

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


  getProjectStatus(projectType: ProjectType, currentStatus: number) {
    const statuses = ProjectStatus[projectType];
    const statusKeys = Object.keys(statuses).map(key => parseInt(key, 10)).sort((a, b) => a - b);
    const currentIndex = statusKeys.indexOf(currentStatus);

    if (currentIndex >= 0 && currentIndex < statusKeys.length - 1) {
      const nextStatusKey = statusKeys[currentIndex + 1];
      return { id: nextStatusKey, status: statuses[nextStatusKey] };
    }
    return null;
  }

  // patchValue(form: any, project: IProject, round = 0) {
  //   // Object.entries(project.projectDetail).forEach(([key, value]) => {
  //   //   if (Array.isArray(value) && form.get(['projectDetail', key]) instanceof FormArray) {
  //   //     const formArray = form.get(['projectDetail', key]) as FormArray;
  //   //     formArray.clear();
  //   //     value.forEach((val: any) => formArray.push(this.fb.control(val)));
  //   //   }
  //   //   // else if (typeof value === 'object' && !(value instanceof Array) && (form.get(['projectDetail', key]) instanceof FormArray)) form.get(['projectDetail', key]).push(this.fb.control(value))
  //   // });
  //   form.patchValue(project)
  //   console.log({form: form.getRawValue(), project: project});
  // }
  //
  // patchValue(form: any, project: IProject) {
  //   const setFormArrayValue = (arr: any[], formArr: FormArray) => (arr.forEach(val => formArr.push(this.fb.control(val))));
  //   Object.entries(project.projectDetail).forEach(([key, value]) => {
  //     const formControl = form.get(['projectDetail', key]);
  //     if (Array.isArray(value) && formControl instanceof FormArray) setFormArrayValue(value, formControl);
  //     else formControl.patchValue(value);
  //   });
  //   form.patchValue(project);
  //   console.log({ form: form.getRawValue(), project: project });
  // }

  patchValue(form: any, project: IProject, round = 0) {
    const setFormArrayValue = (arr: any[], formArr: FormArray) => {
      formArr.clear();
      arr.forEach(val => formArr.push(this.fb.control(val)));
    };

    const patchForm = (data: any, formControl: AbstractControl) => {
      if (Array.isArray(data) && formControl instanceof FormArray) {
        setFormArrayValue(data, formControl);
    } else if (data instanceof Object && formControl instanceof FormGroup) {
        Object.entries(data).forEach(([key, value]) => {
          const subFormControl = formControl.get(key);
          if (Array.isArray(value) && subFormControl instanceof FormArray) {
            setFormArrayValue(value, subFormControl);
          }
        });
      }
    };

    Object.entries(project.projectDetail).forEach(([key, value]) => {
      patchForm(value, form.get(['projectDetail', key]));
    });

    form.patchValue(project);
    console.log({ form: form.getRawValue(), project: project });
  }



}
