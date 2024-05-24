import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../layout/components/header/header.component";
import { ProjectListComponent } from "../project-list/project-list.component";
import { ProjectService } from "../project.service";
import { IProject, Project } from "../../../../core/models/project/project.model";
import { ActivatedRoute } from "@angular/router";
import { AlertService } from "../../../../shared/components/alert/alert.service";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { DatepickerComponent } from "../../layout/navbar/inputs/datepicker/datepicker.component";
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputComponent } from "../../../../shared/components/inputs/input/input.component";
import { JsonPipe, NgForOf, NgIf } from "@angular/common";
import { ICongruenceIdentityGroupDetails, IMaster, ITsuTalentGroupDetails } from "../../../../core/models/projectDetail/project-detail.model";
import { BudgetComponent } from "./budget/budget.component";
import { CongruenceIdentitiesComponent } from "./congruence-identities/congruence-identities.component";
import { ProjectAdvisorComponent } from "./project-advisor/project-advisor.component";
import { ProjectParticipantComponent } from "./project-participant/project-participant.component";
import { ResponsibleStudentsComponent } from "./responsible-students/responsible-students.component";
import { StrategicTalentsComponent } from "./strategic-talents/strategic-talents.component";
import { SvgIconComponent } from "../../../../shared/components/svg-icon/svg-icon.component";
import { TsuTalentsComponent } from "./tsu-talents/tsu-talents.component";
import { INameId } from "../../../../shared/models/common";
import { IUser } from "../../../../core/models/auth/user.model";
import { lastValueFrom } from "rxjs";
import { DurationsComponent } from "./durations/durations.component";
import { EditorComponent } from "@tinymce/tinymce-angular";
import { InputTextareaComponent } from "../../../../shared/components/inputs/input-textarea/input-textarea.component";

@Component({
  selector: 'app-project-edit',
  standalone: true,
  imports: [HeaderComponent, ProjectListComponent, BudgetComponent, ButtonComponent, CongruenceIdentitiesComponent, DatepickerComponent, FormsModule, InputComponent, NgForOf, ProjectAdvisorComponent, ProjectParticipantComponent, ResponsibleStudentsComponent, StrategicTalentsComponent, SvgIconComponent, TsuTalentsComponent, ReactiveFormsModule, NgIf, JsonPipe, DurationsComponent, EditorComponent, InputTextareaComponent],
  templateUrl: './project-edit.component.html',
})
export class ProjectEditComponent  {
  project: IProject | undefined
  form: FormGroup
  tsuTalents: ITsuTalentGroupDetails[] = []
  strategicTalents: INameId[] = [];
  congruenceIdentities: ICongruenceIdentityGroupDetails[] = []
  responsibleStudents: IUser[] = [];
  projectAdvisors: IUser[] = [];

  constructor(private fb: FormBuilder, private psv: ProjectService, private route: ActivatedRoute, private asv: AlertService) {
    Object.assign(this, route.snapshot.data['master'] as IMaster)
    this.form = this.fb.group(new Project());
    this.psv.show(this.route.snapshot.params['id']).subscribe(project => this.psv.patchValue(this.form, project))
  }

  getIndexArray = (controls: any) => Array.from({length: controls.length}, (_, i) => i);

  getFormArray = (formArrayName: string | string[]) => (this.form.get(['projectDetail', ...(Array.isArray(formArrayName) ? formArrayName : [formArrayName])]) as FormArray);

  getFormControl = (formControlName: string | string[]) => this.form.get(['projectDetail', ...(Array.isArray(formControlName) ? formControlName : [formControlName])]);

  newFormControl = (value: string) => new FormControl(value)

  onSubmit() {
    // this.form.get('status')?.setValue(this.psv.getProjectStatus(this.form.get('projectType')?.value,this.form.get('status')?.value)?.id)
    console.log({form: this.form.getRawValue()})
    this.psv.update(this.form.getRawValue(), this.route.snapshot.params['id']).subscribe({next: () => {
      this.asv.success('บันทึกข้อมูลสำเร็จ')
        window.location.href = '/'
      }, error: () => this.asv.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล') })
  }
}
