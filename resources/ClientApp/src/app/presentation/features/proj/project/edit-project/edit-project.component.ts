import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Project } from "../../../../../core/domain/entities/proj/project";
import { RowState } from "../../../../../core/domain/stateManagement/rowState";
import { CommentProject } from "../../../../../core/domain/entities/proj/commentProject";
import {
  addFormControl,
  calculateTotalCost,
  camelCase,
  getIndexArray,
  patchArrayValue,
  ProjService,
  toNumber
} from "../../proj.service";
import { ProjectStatus } from "../../../../../core/domain/stateManagement/projectStatus";
import { ProjPath } from "../../../../../core/domain/stateManagement/ProjPath";
import { Lang } from "../../../../../core/domain/stateManagement/lang";

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.sass']
})
export class EditProjectComponent {
  projectForm: FormGroup = this.fb.group(new Project());
  proj: Project;
  tsuTalents: any;
  strategies: any;
  title: string = "ยื่นเสนอโครงการ";
  rowState: RowState;
  commentProject = new CommentProject()
  attendantOtherHover: boolean[] = [false, false, false];
  arrayContainers: string[] = ['advisorNames', 'responsibleStudents'];
  protected readonly RowState = RowState;
  protected readonly camelCase = camelCase;
  protected readonly window = window;
  protected readonly toNumber = toNumber;
  protected readonly calculateTotalCost = calculateTotalCost;
  protected readonly Lang = Lang;
  protected readonly addFormControl = addFormControl;
  protected readonly getIndexArray = getIndexArray;

  constructor(private fb: FormBuilder, activatedRoute: ActivatedRoute, private projService: ProjService) {
    const {proj, rowState} = window.history.state;
    this.proj = proj ?? undefined;
    this.rowState = rowState ?? undefined;
    const data = activatedRoute.snapshot.data['getForm'];
    this.tsuTalents = this.processTsuTalents(data.tsuTalents);
    this.strategies = data['strategicTalents'];

    if (this.proj) {
      this.setValuesForEditing();
      if (this.isRowStateUnchanged()) this.setValuesForUnchangedState();
    } else this.setValuesForAddedState();
    this.projService.get(ProjPath.CommentProject, this.projectForm.get('projectId')?.value).subscribe((res: any) => {
      res?.commentStatus !== false && (this.commentProject = res)
    });
  }

  setValuesForAddedState = () => this.projectForm.get('rowState')?.setValue(RowState.Added)

  setValuesForEditing() {
    this.matchTalentsWithProject();
    patchArrayValue(this.projectForm, this.proj)
    this.title = "แก้ไขโครงการ";
    this.projectForm.get('rowState')?.setValue(this.rowState ?? RowState.Modified);
    this.projectForm.get('status')?.setValue(ProjectStatus.WaitingCorrection);
  }

  setValuesForUnchangedState() {
    this.projectForm.disable();
    this.title = "ตรวจสอบโครงการ";
  }

  totalAttendants() {
    let totalAdvisor = toNumber(this.getFormArray('attendants').at(0).get('advisorCount')?.get('Male')?.value) + toNumber(this.getFormArray('attendants').at(0).get('advisorCount')?.get('Female')?.value)
    let totalStudentCount = toNumber(this.getFormArray('attendants').at(0).get('studentCount')?.get('Male')?.value) + toNumber(this.getFormArray('attendants').at(0).get('studentCount')?.get('Female')?.value)
    let totalTeacherCount = toNumber(this.getFormArray('attendants').at(0).get('teacherCount')?.get('Male')?.value) + toNumber(this.getFormArray('attendants').at(0).get('teacherCount')?.get('Female')?.value)
    this.getFormArray('attendants').at(0).get('otherCounts');
    let totalOtherCounts = 0;
    (this.getFormTwoArray('attendants', 'otherCounts').value).forEach((item: any) => totalOtherCounts += toNumber(item.Male) + toNumber(item.Female))
    return toNumber(totalAdvisor) + toNumber(totalStudentCount) + toNumber(totalTeacherCount) + toNumber(totalOtherCounts);
  }

  matchTalentsWithProject = () => this.tsuTalents.forEach((t: any) => t.forEach((m: any) => m.checked = !!this.proj.tsuTalent[camelCase(t[0]['activityGroup'])].find((p: any) => p?.tsuTalentId === m.tsuTalentId)));

  addArray(formTwoArray: FormArray) {
    formTwoArray.push(new FormControl(''))
  }

  deleteForm(formTwoArray: FormArray, index: number) {
    formTwoArray.removeAt(index)
  }

  removeItem = (formArray: any, index: number) => formArray.removeAt(index);

  getFormArray = (formArrayName: string) => (this.projectForm.get(formArrayName) as FormArray);

  getFormTwoArray = (formArrayOne: any, formArrayTwo: any, index: number = 0) => (((this.projectForm.get(formArrayOne) as FormArray)).at(index).get(formArrayTwo) as FormArray);

  getFormGroupArray = (formGroupName: string, formArrayName: string) => (this.projectForm.get([formGroupName, formArrayName]) as FormArray);

  onSubmit = () => {
    // const currentDate = new Date();
    //
    // if (this.projectForm.get('endTime')?.value > this.projectForm.get('startTime')?.value) {
    //     if (this.projectForm.get('endTime')?.value >= currentDate) {
    //         console.log("เวลาที่กำหนดถูกต้อง");
    //     } else {
    //        alert("startTime ต้องมากกว่าวันปัจจุบัน");
    //     }
    // } else {
    //     alert("endTime ต้องมากกว่า startTime");
    // }
    this.projectForm.markAllAsTouched()
    // if (this.projectForm.valid) {
    console.log({onSubmit: this.projectForm.value})
    this.projectForm.get('status')?.setValue(ProjectStatus.WaitAdvisorApproval)
    this.projService.post(ProjPath.Project, this.projectForm.value).subscribe({
      next: (res) => {
        console.log({res})
        window.alert("โครงการถูกบันทึกเรียบร้อยแล้ว");
        history.replaceState(null, '', window.location.href)
        window.location.href = ''
      },
      error: (err) => {
        console.log(err)
        window.alert("เกิดข้อผิดพลาดในการบันทึกโครงการ โปรดตรวจสอบข้อมูลโครงการอีกครั้ง");
      }
    })
    // } else {
    //     console.log(this.projectForm.controls)
    //     window.alert('โปรดกรอกข้อมูลให้ครบถ้วน');
    // }
  }

  updateValueChange(formControl: FormArray, value: any) {
    const existingIndex = formControl.controls.findIndex((control: AbstractControl) => control.value.tsuTalentId === value.tsuTalentId);
    if (existingIndex !== -1) formControl.removeAt(existingIndex); else formControl.push(this.fb.control({tsuTalentId: value.tsuTalentId}));
  }

  addResponsibleStudents = (formArray: any) => {
    formArray.push(new FormGroup({
      studentId: new FormControl('', [Validators.required]),
      name: new FormControl(''),
      phoneNumber: new FormControl('', [Validators.required])
    }));
  }

  addResponsibleAdvisor = (formArray: any) => {
    formArray.push(new FormGroup({
      name: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required])
    }));
  }

  tsuChecked(tsuTalentId: any, tsuTalents: any) {
    const formTsuTalents = this.getFormGroupArray('tsuTalent', camelCase(tsuTalents[0]['activityGroup'])).value;
    return formTsuTalents.some((formTsuTalent: any) => formTsuTalent?.tsuTalentId === tsuTalentId);
  }

  save() {
    this.projectForm.get('status')?.setValue(ProjectStatus.WaitingCorrection)
    this.projService.post(ProjPath.Project, this.projectForm.value).subscribe({
      next: (res) => {
        window.alert("บันทึกโครงการสำเร็จ");
        history.replaceState(null, '', window.location.href)
        window.location.href = ''
      },
      error: (err) => {
        console.log(err)
        window.alert(`ข้อมูลโครงการไม่ถูกต้อง`)
      }
    })
  }

  private processTsuTalents(tsuTalents: any[]): any[] {
    return tsuTalents
      .flatMap(item => item).reduce((result: any[], item: any) => {
        const groupIndex = result.findIndex(group => group[0]?.['activityGroup'] === item['activityGroup']);
        if (groupIndex === -1) result.push([item]); else result[groupIndex].push(item);
        return result;
      }, []);
  }

  private isRowStateUnchanged = (): boolean => this.projectForm.get('rowState')?.value === RowState.Unchanged;
}
