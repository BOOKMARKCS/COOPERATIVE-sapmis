import { Component, ElementRef, ViewChild } from '@angular/core';
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
import {
  Budget,
  ICongruenceIdentityGroupDetails,
  IMaster,
  ITsuTalentGroupDetails
} from "../../../../core/models/projectDetail/project-detail.model";
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
import { DurationsComponent } from "./durations/durations.component";
import { EditorComponent } from "@tinymce/tinymce-angular";
import { InputTextareaComponent } from "../../../../shared/components/inputs/input-textarea/input-textarea.component";
import { AuthService } from "../../../../core/services/auth.service";

interface IFile {
  data: string | ArrayBuffer | null | undefined
  lastModified: number
  name: string
  webkitRelativePath: string
  size: number
  type: string
}

@Component({
  selector: 'app-project-edit',
  standalone: true,
  imports: [HeaderComponent, ProjectListComponent, BudgetComponent, ButtonComponent, CongruenceIdentitiesComponent, DatepickerComponent, FormsModule, InputComponent, NgForOf, ProjectAdvisorComponent, ProjectParticipantComponent, ResponsibleStudentsComponent, StrategicTalentsComponent, SvgIconComponent, TsuTalentsComponent, ReactiveFormsModule, NgIf, JsonPipe, DurationsComponent, EditorComponent, InputTextareaComponent],
  templateUrl: './project-edit.component.html',
})
export class ProjectEditComponent {
  @ViewChild('fileInput', {static: false}) fileInput?: ElementRef;
  // selectedFile: IFile | undefined;
  selectedFile: any;
  project: IProject | undefined
  form: FormGroup
  tsuTalents: ITsuTalentGroupDetails[] = []
  strategicTalents: INameId[] = [];
  congruenceIdentities: ICongruenceIdentityGroupDetails[] = []
  responsibleStudents: IUser[] = [];
  projectAdvisors: IUser[] = [];
  initialBudget: Budget | undefined;


  constructor(private fb: FormBuilder, private psv: ProjectService, private route: ActivatedRoute, public asv: AuthService, private alertService: AlertService) {
    Object.assign(this, route.snapshot.data['master'] as IMaster)
    this.form = this.fb.group(new Project());
    this.psv.show(this.route.snapshot.params['id']).subscribe(project => {
      this.project = project
      this.psv.patchValue(this.form, project)
      this.initialBudget = this.form.get('projectDetail.budget')?.value;
    })
  }

  getIndexArray = (controls: any) => Array.from({length: controls.length}, (_, i) => i);

  getFormArray = (formArrayName: string | string[]) => (this.form.get(['projectDetail', ...(Array.isArray(formArrayName) ? formArrayName : [formArrayName])]) as FormArray);

  getFormControl = (formControlName: string | string[]) => this.form.get(['projectDetail', ...(Array.isArray(formControlName) ? formControlName : [formControlName])]);

  newFormControl = (value: string) => new FormControl(value)

  onSubmit() {
    console.log("preStatus", this.form.get('preStatus')?.value)
    if (this.form.get('preStatus')?.value && this.form.get('preStatus')?.value > this.form.get('status')?.value) {
      const currentBudget = this.form.get('projectDetail.budget')?.value;
      if (JSON.stringify(this.initialBudget) !== JSON.stringify(currentBudget)) this.form.get('status')?.setValue(1002)
      else this.form.get('status')?.setValue(this.form.get('preStatus')?.value)
    } else {
      this.form.get('preStatus')?.setValue(null)
      this.form.get('status')?.setValue(this.psv.getProjectStatus(this.form.get('projectType')?.value, this.form.get('status')?.value)?.id)
    }
    const formData = new FormData();
    if (this.selectedFile && this.selectedFile.length > 0) {
      formData.append('file', this.selectedFile[0]);
      console.log({formData:formData.get('file')})
    }
    this.psv.update(formData, this.route.snapshot.params['id'], formData.get('file')).subscribe({
      next: (r) => {
        // this.alertService.success('บันทึกข้อมูลสำเร็จ')
        window.alert({r})
        console.log({r})
      }, error: () => this.alertService.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
    })
  }

  triggerFileInput() {
    this.fileInput?.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0]; // Get only the first file
      this.readFile(file);
    }
  }
  // onFileSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     this.selectedFile = input.files;
  //   }
  // }

  readFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.selectedFile = {
        lastModified: file.lastModified,
        name: file.name,
        webkitRelativePath: file.webkitRelativePath,
        size: file.size,
        type: file.type,
        data: e.target?.result,
      };
    }
    reader.readAsDataURL(file);
  }

  removeFile() {
    this.selectedFile = undefined;
    if (this.fileInput && this.fileInput.nativeElement) this.fileInput.nativeElement.value = '';
  }

  getFileSize(size: number): string {
    const KB = 1024;
    const MB = KB * 1024;
    if (size < KB) {
      return size + ' bytes';
    } else if (size < MB) {
      return (size / KB).toFixed(2) + ' KB';
    } else {
      return (size / MB).toFixed(2) + ' MB';
    }
  }

  protected readonly Project = Project;
  public me: any;
}
