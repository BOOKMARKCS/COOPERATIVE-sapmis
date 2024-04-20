import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../layout/components/header/header.component";
import {CurrencyPipe, JsonPipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ProposerService} from "../proposer.service";
import {ProjectDetail, StrategicTalent, TsuTalent} from "../../../core/models/projectDetail/project-detail.model";
import {Project} from "../../../core/models/project/project.model";
import {InputComponent} from "../../layout/components/inputs/input/input.component";
import {TableComponent} from "../../../shared/components/table/table.component";
import {SvgIconComponent} from "angular-svg-icon";
import {ResponsibleStudentsComponent} from "./responsible-students/responsible-students.component";
import {AuthService} from "../../../core/services/auth.service";
import {ProjectAdvisorComponent} from "../project-advisor/project-advisor.component";
import {ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {DatepickerComponent} from "../../layout/components/inputs/datepicker/datepicker.component";

@Component({
  selector: 'app-proposal',
  standalone: true,
  imports: [
    HeaderComponent,
    CurrencyPipe,
    NgStyle,
    ReactiveFormsModule,
    InputComponent,
    JsonPipe,
    NgForOf,
    TableComponent,
    SvgIconComponent,
    NgIf,
    ResponsibleStudentsComponent,
    ProjectAdvisorComponent,
    NgClass,
    DatepickerComponent
  ],
  templateUrl: './proposal.component.html',
  styleUrl: './proposal.component.sass'
})
export class ProposalComponent implements OnInit {
  form: FormGroup
  tsuTalents: any
  strategicTalents: any;
  hovered: boolean = false;

  constructor(private fb: FormBuilder, private sv: ProposerService, private authService: AuthService, route: ActivatedRoute) {
    this.tsuTalents = route.snapshot.data['master'].tsuTalents
    this.strategicTalents = route.snapshot.data['master'].strategicTalents
    this.form = this.fb.group({
      project: this.fb.group(new Project()),
      projectDetail: this.fb.group(new ProjectDetail())
    });
    console.log("tsuTalents", this.form.get(['projectDetail', 'tsuTalents'])?.value)


    this.form.get(['projectDetail', 'activityGroupName'])?.setValue('')
    console.log("activityGroupName", this.form.get(['projectDetail', 'activityGroupName'])?.value)
    this.form.get(['projectDetail', 'activityGroupName'])
    this.authService.user$.subscribe(u => {
      console.log({u: u.user.organization.name, uu: u.user['student_club'].faculties.name})
      this.form.get(['projectDetail', 'activityGroupName'])?.setValue(u.user.organization.name + 'คณะ' + u.user.student_club.faculties.name);
    })
    console.log({form: this.form?.value})
  }

  ngOnInit(): void {

  }

  getIndexArray = (controls: any) => Array.from({length: controls.length}, (_, i) => i);

  getFormArray = (formArrayName: string) => (this.form.get(['projectDetail', formArrayName]) as FormArray);


  onSubmit() {
    console.log({form:this.form.value})
    this.sv.store(this.form.value).subscribe(console.log)
  }

  setTsuTalent(id: number, index: number) {
    const tsuTalentDetailIdFormArray = this.form.get(['projectDetail', 'tsuTalent', 'tsuTalentDetailId']) as FormArray;
    if (tsuTalentDetailIdFormArray) {
      const idIndex = tsuTalentDetailIdFormArray.value.indexOf(id);
      idIndex !== -1 ? tsuTalentDetailIdFormArray.removeAt(idIndex) : tsuTalentDetailIdFormArray.push(new FormControl(id));
    } else console.error('FormArray tsuTalentDetailId not found or not instance of FormArray');
  }


  setStrategic(id:number) {
    const strategicTalentFormArray = this.form.get(['projectDetail','strategicTalent','strategicTalentDetailId']) as FormArray;
    console.log({strategicTalentFormArray})
    if (strategicTalentFormArray) {
      const idIndex = strategicTalentFormArray.value.indexOf(id);
      idIndex !== -1 ? strategicTalentFormArray.removeAt(idIndex) : strategicTalentFormArray.push(new FormControl(id));
    } else console.error('FormArray tsuTalentDetailId not found or not instance of FormArray');
  }

  newFormControl(value:string){
    return new FormControl(value)
  }
  addArray(formArray: FormArray<any>) {
    formArray.push(new FormControl(''))
  }


  protected readonly FormControl = FormControl;
}
