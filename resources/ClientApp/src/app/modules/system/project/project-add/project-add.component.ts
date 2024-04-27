import {Component, NgIterable} from '@angular/core';
import {ButtonComponent} from "../../../../shared/components/button/button.component";
import {DatepickerComponent} from "../../layout/navbar/inputs/datepicker/datepicker.component";
import {HeaderComponent} from "../../layout/components/header/header.component";
import {InputComponent} from "../../../../shared/components/inputs/input/input.component";
import {NgForOf} from "@angular/common";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {IUser} from "../../../../core/models/auth/user.model";
import {IProjectAdvisor, ProjectDetail} from "../../../../core/models/projectDetail/project-detail.model";
import {ProjectService} from "../project.service";
import {AuthService} from "../../../../core/services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {Project, ProjectType} from "../../../../core/models/project/project.model";
import {ResponsibleStudentsComponent} from "./responsible-students/responsible-students.component";
import {ProjectAdvisorComponent} from "./project-advisor/project-advisor.component";
import {TsuTalentsComponent} from "./tsu-talents/tsu-talents.component";
import {StrategicTalentsComponent} from "./strategic-talents/strategic-talents.component";
import {CongruenceIdentitiesComponent} from "./congruence-identities/congruence-identities.component";
import {ProjectParticipantComponent} from "./project-participant/project-participant.component";
import {BudgetComponent} from "./budget/budget.component";

@Component({
  selector: 'app-project-add',
  standalone: true,
  imports: [
    ButtonComponent,
    DatepickerComponent,
    HeaderComponent,
    InputComponent,
    NgForOf,
    ReactiveFormsModule,
    ResponsibleStudentsComponent,
    ProjectAdvisorComponent,
    TsuTalentsComponent,
    StrategicTalentsComponent,
    CongruenceIdentitiesComponent,
    ProjectParticipantComponent,
    BudgetComponent
  ],
  templateUrl: './project-add.component.html',
})
export class ProjectAddComponent {
  form: FormGroup
  tsuTalents: any
  strategicTalents: any;
  congruenceIdentities : any
  responsibleStudents: IUser[];
  projectAdvisors: NgIterable<IProjectAdvisor>[];

  constructor(private fb: FormBuilder, private psv: ProjectService, private authService: AuthService, route: ActivatedRoute) {
    this.tsuTalents = route.snapshot.data['master'].tsuTalents
    this.strategicTalents = route.snapshot.data['master'].strategicTalents
    this.responsibleStudents = route.snapshot.data['master'].responsibleStudents
    this.congruenceIdentities = route.snapshot.data['master'].congruenceIdentities
    this.projectAdvisors = route.snapshot.data['master'].projectAdvisors
    this.form = this.fb.group({
      project: this.fb.group(new Project()),
      projectDetail: this.fb.group(new ProjectDetail())
    });
    console.log({master:route.snapshot.data['master']})
    this.authService.user$.subscribe(u =>  {
      this.getFormControl('activityGroupName')?.setValue(u.user.role.organization.name + 'คณะ' + u.user?.student?.faculty.name) || this.getFormControl('activityGroupName')?.disable()
      this.getFormArray('responsibleStudents').at(0)?.get('user')?.patchValue(u.user)
      this.form.get(['project','id'])?.setValue('')
      this.form.get(['project','userId'])?.setValue(u.user.id)
      this.psv.setProjectStatus().subscribe(s => this.form.get(['project','status'])?.setValue(s))
      this.form.get(['project','academicYear'])?.setValue(2566)
      this.form.get(['project','projectType'])?.setValue(ProjectType.StudentClub)
    })
    console.log({form: this.form?.value})
  }

  ngOnInit(): void {
  }

  getIndexArray = (controls: any) => Array.from({length: controls.length}, (_, i) => i);

  getFormArray = (formArrayName: string | string[]) => (this.form.get(['projectDetail',  ...(Array.isArray(formArrayName) ? formArrayName : [formArrayName])]) as FormArray);

  getFormControl = (formControlName: string | string[]) => this.form.get(['projectDetail', ...(Array.isArray(formControlName) ? formControlName : [formControlName])]);

  onSubmit() {
    console.log({form:this.form.getRawValue()})
    this.psv.store(this.form.getRawValue()).subscribe(console.log)
  }

  newFormControl(value:string){
    return new FormControl(value)
  }
}
