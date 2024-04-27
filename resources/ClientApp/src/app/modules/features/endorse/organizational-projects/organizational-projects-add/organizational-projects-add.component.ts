import { Component, ViewContainerRef } from '@angular/core';
import { HeaderComponent } from "../../../../system/layout/components/header/header.component";
import { ProjectService } from "../../../../system/project/project.service";
import { ButtonComponent } from "../../../../../shared/components/button/button.component";
import { InputComponent } from "../../../../../shared/components/inputs/input/input.component";
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Project, ProjectStatus } from "../../../../../core/models/project/project.model";
import { ProjectDetail } from "../../../../../core/models/projectDetail/project-detail.model";
import { InputPeerComponent } from "../../../../../shared/components/inputs/input-peer/input-peer.component";
import { ResponsibleStudentsComponent } from "../../../../system/project/project-add/responsible-students/responsible-students.component";
import { ProjectAdvisorComponent } from "../../../../system/project/project-add/project-advisor/project-advisor.component";
import { ActivatedRoute } from "@angular/router";
import { AlertService } from "../../../../../shared/components/alert/alert.service";
import { JsonPipe, NgIf } from "@angular/common";

@Component({
  selector: 'app-organizational-projects-add',
  standalone: true, imports: [HeaderComponent, ButtonComponent, InputComponent, ReactiveFormsModule, InputPeerComponent, ResponsibleStudentsComponent, ProjectAdvisorComponent, NgIf, JsonPipe],
  templateUrl: './organizational-projects-add.component.html',
})
export class OrganizationalProjectsAddComponent {
  form: FormGroup
  tsuTalents: any
  strategicTalents: any;
  congruenceIdentities: any
  responsibleStudents: any;
  projectAdvisors: any;

  constructor(fb: FormBuilder, private psv: ProjectService, route: ActivatedRoute, private asv: AlertService, vcr: ViewContainerRef) {
    Object.assign(this, route.snapshot.data['master'])
    this.form = fb.group({project: fb.group(new Project()), projectDetail: fb.group(new ProjectDetail())});
    this.asv.setVCR(vcr)
  }

  getFormArray = (formArrayName: string | string[]) => (this.form.get(['projectDetail', ...(Array.isArray(formArrayName) ? formArrayName : [formArrayName])]) as FormArray);

  getFormControl = (formControlName: string | string[]) => this.form.get(['projectDetail', ...(Array.isArray(formControlName) ? formControlName : [formControlName])]);

  onSubmit() {
    if (this.form.valid) {
      this.form.get(['project', 'status'])?.setValue(ProjectStatus.Draft)
      this.getFormControl('activityGroupName')?.setValue('')
      this.psv.store(this.form.getRawValue()).subscribe({next: (res: any) => {console.log({res}); this.asv.success(res)}, error: err => { console.log({err}); this.asv.error(err.error)}})
    } else this.markFormGroupTouched(this.form);
  }

  markFormGroupTouched = (formGroup: FormGroup | FormArray): void => Object.values(formGroup.controls).forEach(control => control instanceof FormGroup || control instanceof FormArray ? this.markFormGroupTouched(control) : control.markAsTouched());

}
