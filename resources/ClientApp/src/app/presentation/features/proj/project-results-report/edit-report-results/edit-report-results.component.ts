import { Component, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { CommentProjectReport } from "../../../../../core/domain/entities/proj/commentProjectReport";
import { RowState } from "../../../../../core/domain/stateManagement/rowState";
import { ProjectStatus } from "../../../../../core/domain/stateManagement/projectStatus";
import { Lang } from "../../../../../core/domain/stateManagement/lang";
import {
  addFormControl,
  calculateTotalCost,
  getIndexArray,
  patchArrayValue,
  ProjService,
  toNumber
} from "../../proj.service";
import { ProjectResultsReport } from "../../../../../core/domain/entities/proj/projectResultsReport";
import { ProjPath } from "../../../../../core/domain/stateManagement/ProjPath";


@Component({
  selector: 'app-report-results',
  templateUrl: './edit-report-results.component.html',
})
export class EditReportResultsComponent implements OnDestroy {
  projectResultsReport: FormGroup = this.fb.group(new ProjectResultsReport());
  commentProjectReport: CommentProjectReport = new CommentProjectReport();
  rowState?: RowState;
  attendantOtherHover: boolean[] = [false, false, false];
  fieldsToDisable = ['projectReportName', 'activityGroupName', 'responsibleStudents', 'advisorNames', 'location', 'attendants', 'kpi','budgetsProjects']
  protected readonly RowState = RowState;
  protected readonly Lang = Lang;
  protected readonly toNumber = toNumber;
  protected readonly window = window;
  protected readonly calculateTotalCost = calculateTotalCost;
  protected readonly addFormControl = addFormControl;
  protected readonly getIndexArray = getIndexArray;

  constructor(private fb: FormBuilder, private projService: ProjService) {
    let {project, projectReport, rowState} = window.history.state
    if (project) {
      project.projectReportName = project.projectName
      patchArrayValue(this.projectResultsReport, project)
      this.patchProjectReport(this.projectResultsReport.value)
      this.patchProject(this.projectResultsReport.value, project)
      this.disableForm(this.projectResultsReport, this.fieldsToDisable)
      this.projectResultsReport.get('projectId')?.setValue(project.projectId)
      this.projectResultsReport.get('rowState')?.setValue(RowState.Added)
    } else if (projectReport) {
      if (rowState == RowState.Unchanged) {
        patchArrayValue(this.projectResultsReport, projectReport)
        this.projectResultsReport.disable()
      }
      else {
        patchArrayValue(this.projectResultsReport, projectReport)
        this.projectResultsReport.get('rowState')?.setValue(RowState.Modified)
        this.projectResultsReport.get('status')?.setValue(ProjectStatus.WaitAdvisorApproval)
        projService.get(ProjPath.CommentProjectReport, this.projectResultsReport.get('projectReportId')?.value).subscribe((commentProjectReport: any) => this.commentProjectReport = commentProjectReport)
      }
    }
  }

  submit() {
    this.projectResultsReport.enable()
    this.disableForm(this.projectResultsReport, ['users'])
    this.projectResultsReport.get('status')?.setValue(ProjectStatus.WaitAdvisorApproval)
    console.log(this.projectResultsReport.value)
    this.projService.post(ProjPath.ProjectReport, this.projectResultsReport.value).subscribe({
      next: (res) => {
        console.log(res)
        window.alert("ส่งรายงานผลโครงการสำเร็จ")
        history.replaceState(null, '', window.location.href)
        window.location.href = ''
      }, error: (err) => {
        console.log(err)
        window.alert("มีข้อผิดพลาดระหว่างส่ง")
      }
    })
    // } else {
    //   console.log(this.projectResultsReport.controls)
    //   window.alert('โปรดกรอกข้อมูลให้ครบถ้วน');
    // }
  }

  getFormArray = (formArrayName: any) => (this.projectResultsReport.get(formArrayName) as FormArray);

  getFormGroupArray = (formGroupName: string, formArrayName: string) => (this.projectResultsReport.get([formGroupName, formArrayName]) as FormArray);

  getFormTwoArray = (formArrayOne: any, formArrayTwo: any) => (((this.projectResultsReport.get(formArrayOne) as FormArray)).at(0).get(formArrayTwo) as FormArray);

  removeItem = (formArray: any, index: number) => formArray.removeAt(index);

  addArray(formTwoArray: FormArray) {
    formTwoArray.push(new FormControl('',[Validators.required]))
  }

  deleteForm = (formTwoArray: FormArray, index: number) => formTwoArray.removeAt(index)

  patchProjectReport(data: any) {
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'kpi' && value) {
        Object.entries(value).forEach(([keyItem, valueItem]) => {
          this.getFormGroupArray('kpiGoals', keyItem).clear()
          valueItem.forEach((item: any) => (this.getFormGroupArray('kpiGoals', keyItem) as any).push(new FormControl(undefined)))
        })
      }
    })
  }

  patchProject(data: any, project: any) {
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value) && typeof value == 'object' && typeof value[0] == 'object') {
        Object.entries(value[0]).forEach(([keyItem, valueItem], index) => {
          let fistArray: boolean = true;
          if (typeof value[0][keyItem] == 'object') {
            if (value[0][keyItem].length > 0) {
              let custom : boolean = false
              if (key === 'budgets') {
                if(!['costDetails', 'equipmentCostDetails', 'otherDetails', 'remunerationDetails'].includes(keyItem)){

                (valueItem as any).forEach((item: any, index: number) => {
                  this.getFormTwoArray('budgets', keyItem).removeAt(0)
                  this.getFormTwoArray(key, keyItem)?.push(new FormControl(undefined))
                })
                }
                custom = true
              }
              if (custom ) {
                this.getFormTwoArray('budgetsProjects', keyItem).clear();
                value[0][keyItem].forEach((item: any) => {
                    this.getFormTwoArray('budgetsProjects', keyItem)?.push(new FormControl(item))
                })
                this.getFormArray('budgetsProjects').at(0).get('budgetCode')?.setValue(this.projectResultsReport.get('budgetCode')?.value)
                this.getFormArray('budgetsProjects').at(0).get('projectId')?.setValue(this.projectResultsReport.get('projectId')?.value)
              }

              if (key == 'attendants') {
                this.getFormTwoArray('actualParticipants', keyItem).clear();
                (valueItem as any).forEach((item: any) => {
                  if (typeof item === 'object') {
                    let newFormControl = new FormGroup({})
                    Object.entries(item).forEach(([k, v]) => newFormControl.addControl(k, new FormControl(v)))
                    this.getFormTwoArray('actualParticipants', keyItem).push(newFormControl)
                  } else {
                    this.getFormTwoArray('actualParticipants', keyItem).push(new FormControl(item))
                  }
                })
                this.getFormArray('actualParticipants').patchValue(this.getFormArray('attendants').value)
              }
            }
          }
        })
      }
    })

    Object.entries(project).forEach(([key, value]) => {
      if (Array.isArray(value) && key == 'objectives') {
        this.getFormArray('achievingObjectives').clear()
        Object.entries(value).forEach(([keyItem, valueItem], index) => {
          let newFormControl = new FormGroup({})
          newFormControl.addControl('projectObjectives', new FormControl(valueItem))
          newFormControl.addControl('objectiveAchievementLevel', new FormControl(''))
          this.getFormArray('achievingObjectives').push(newFormControl);
          this.getFormArray('achievingObjectives')?.at(index).get('projectObjectives')?.disable()
        })
        this.getFormArray(key)?.clear();
        value.forEach(item => this.getFormArray(key)?.push(new FormControl(item)))
      }
    })
  }

  disableForm = (formGroup: FormGroup, fieldsToDisable: string[]) => fieldsToDisable.forEach(fieldName => formGroup.get(fieldName)?.disable());

  ngOnDestroy(): void {
    history.replaceState(window.history.state, '', window.location.href);
  }
}
