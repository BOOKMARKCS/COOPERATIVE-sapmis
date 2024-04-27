import { Component, NgIterable, OnInit } from '@angular/core';
import { CurrencyPipe, JsonPipe, NgClass, NgForOf, NgIf, NgStyle } from "@angular/common";
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { HeaderComponent } from "../../../system/layout/components/header/header.component";
import { InputComponent } from "../../../../shared/components/inputs/input/input.component";
import { DatepickerComponent } from "../../../system/layout/navbar/inputs/datepicker/datepicker.component";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { IUser } from "../../../../core/models/auth/user.model";
import { IProjectAdvisor, ProjectDetail } from "../../../../core/models/projectDetail/project-detail.model";
import { ProjectService } from "../../../system/project/project.service";
import { AuthService } from "../../../../core/services/auth.service";
import { Project, ProjectType } from "../../../../core/models/project/project.model";
import { TsuTalentsComponent } from "../../../system/project/project-add/tsu-talents/tsu-talents.component";
import {
  StrategicTalentsComponent
} from "../../../system/project/project-add/strategic-talents/strategic-talents.component";
import {
  CongruenceIdentitiesComponent
} from "../../../system/project/project-add/congruence-identities/congruence-identities.component";
import {
  ProjectParticipantComponent
} from "../../../system/project/project-add/project-participant/project-participant.component";
import { BudgetComponent } from "../../../system/project/project-add/budget/budget.component";
import {
  ResponsibleStudentsComponent
} from "../../../system/project/project-add/responsible-students/responsible-students.component";
import { ProjectAdvisorComponent } from "../../../system/project/project-add/project-advisor/project-advisor.component";
import { SvgIconComponent } from "../../../../shared/components/svg-icon/svg-icon.component";

@Component({
  selector: 'app-proposal',
  standalone: true,
  imports: [HeaderComponent, CurrencyPipe, NgStyle, ReactiveFormsModule, InputComponent, JsonPipe, NgForOf, NgIf, ResponsibleStudentsComponent, ProjectAdvisorComponent, NgClass, DatepickerComponent, ButtonComponent, TsuTalentsComponent, StrategicTalentsComponent, CongruenceIdentitiesComponent, ProjectParticipantComponent, BudgetComponent, SvgIconComponent],
  templateUrl: './proposal.component.html',
})
export class ProposalComponent implements OnInit {
  form: FormGroup
  tsuTalents: any
  strategicTalents: any;
  congruenceIdentities: any
  responsibleStudents: IUser[];
  projectAdvisors: NgIterable<IProjectAdvisor>[];

  constructor(fb: FormBuilder, private psv: ProjectService, private asv: AuthService, route: ActivatedRoute) {
    this.tsuTalents = route.snapshot.data['master'].tsuTalents
    this.strategicTalents = route.snapshot.data['master'].strategicTalents
    this.responsibleStudents = route.snapshot.data['master'].responsibleStudents
    this.congruenceIdentities = route.snapshot.data['master'].congruenceIdentities
    this.projectAdvisors = route.snapshot.data['master'].projectAdvisors
    this.form = fb.group({ project: fb.group(new Project()), projectDetail: fb.group(new ProjectDetail()) });
    this.asv.user$.subscribe(u => {
      this.getFormControl('activityGroupName')?.setValue(u.user.role.organization.name + 'คณะ' + u.user?.student?.faculty.name) || this.getFormControl('activityGroupName')?.disable()
      this.getFormArray('responsibleStudents').at(0)?.get('user')?.patchValue(u.user)
      this.form.get(['project', 'id'])?.setValue('')
      this.form.get(['project', 'userId'])?.setValue(u.user.id)
      this.psv.setProjectStatus().subscribe(s => this.form.get(['project', 'status'])?.setValue(s))
      this.form.get(['project', 'academicYear'])?.setValue(2566)
      this.form.get(['project', 'projectType'])?.setValue(ProjectType.StudentClub)
    })
    console.log({form: this.form?.value})
  }

  ngOnInit(): void {
  }

  getIndexArray = (controls: any) => Array.from({length: controls.length}, (_, i) => i);

  getFormArray = (formArrayName: string | string[]) => (this.form.get(['projectDetail', ...(Array.isArray(formArrayName) ? formArrayName : [formArrayName])]) as FormArray);

  getFormControl = (formControlName: string | string[]) => this.form.get(['projectDetail', ...(Array.isArray(formControlName) ? formControlName : [formControlName])]);

  onSubmit() {
    console.log({form: this.form.getRawValue()})
    this.psv.store(this.form.getRawValue()).subscribe(console.log)
  }

  newFormControl =(value: string) => new FormControl(value)
}
