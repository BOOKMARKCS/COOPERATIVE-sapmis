import { Component } from '@angular/core';
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { DatepickerComponent } from "../../layout/navbar/inputs/datepicker/datepicker.component";
import { HeaderComponent } from "../../layout/components/header/header.component";
import { InputComponent } from "../../../../shared/components/inputs/input/input.component";
import { NgForOf, NgIf } from "@angular/common";
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { IProjectAdvisor, IResponsibleStudent, ProjectDetail } from "../../../../core/models/projectDetail/project-detail.model";
import { ProjectService } from "../project.service";
import { ActivatedRoute } from "@angular/router";
import { Project } from "../../../../core/models/project/project.model";
import { ProjectStatus } from "../../../../core/models/project/project.enum";
import { AlertService } from "../../../../shared/components/alert/alert.service";
import { InputPeerComponent } from "../../../../shared/components/inputs/input-peer/input-peer.component";
import { ResponsibleStudentsComponent } from "../project-edit/responsible-students/responsible-students.component";
import { ProjectAdvisorComponent } from "../project-edit/project-advisor/project-advisor.component";

@Component({
  selector: 'app-project-add',
  standalone: true,
  imports: [ButtonComponent, DatepickerComponent, HeaderComponent, InputComponent, NgForOf, ReactiveFormsModule, InputPeerComponent, ResponsibleStudentsComponent, ProjectAdvisorComponent, NgIf],
  templateUrl: './project-add.component.html',
})
export class ProjectAddComponent {
  form: FormGroup
  responsibleStudents: IResponsibleStudent | undefined;
  projectAdvisors: IProjectAdvisor | undefined;

  constructor(fb: FormBuilder, private psv: ProjectService, route: ActivatedRoute, private asv: AlertService) {
    Object.assign(this, route.snapshot.data['master'])
    this.form = fb.group({project: fb.group(new Project()), projectDetail: fb.group(new ProjectDetail())});
  }

  getFormArray = (formArrayName: string | string[]) => (this.form.get(['projectDetail', ...(Array.isArray(formArrayName) ? formArrayName : [formArrayName])]) as FormArray);

  getFormControl = (formControlName: string | string[]) => this.form.get(['projectDetail', ...(Array.isArray(formControlName) ? formControlName : [formControlName])]);

  onSubmit() {
    if (this.form.valid) {
      this.form.get(['project', 'status'])?.setValue(this.psv.getProjectStatus(this.form.get('projectType')?.value,this.form.get('status')?.value))
      this.psv.store(this.form.getRawValue()).subscribe({
        next: (res: any) => this.asv.success(res), error: err => this.asv.error(err.error)
      })
    } else this.markFormGroupTouched(this.form);
  }

  markFormGroupTouched = (formGroup: FormGroup | FormArray): void => Object.values(formGroup.controls).forEach(control => control instanceof FormGroup || control instanceof FormArray ? this.markFormGroupTouched(control) : control.markAsTouched());


}
