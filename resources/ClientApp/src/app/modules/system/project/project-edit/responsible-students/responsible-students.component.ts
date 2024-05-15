import { Component, Input, NgIterable, OnInit } from '@angular/core';
import { JsonPipe, NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputComponent } from "../../../../../shared/components/inputs/input/input.component";
import { ButtonComponent } from "../../../../../shared/components/button/button.component";
import { IResponsibleStudent, ResponsibleStudent } from "../../../../../core/models/projectDetail/project-detail.model";
import { environment } from '../../../../../../environments/environment';
import { SvgIconComponent } from "../../../../../shared/components/svg-icon/svg-icon.component";
import { IUser } from "../../../../../core/models/auth/user.model";

@Component({
  selector: 'app-responsible-students',
  standalone: true,
  imports: [InputComponent, NgForOf, JsonPipe, NgIf, FormsModule, ReactiveFormsModule, NgOptimizedImage, ButtonComponent, SvgIconComponent],
  templateUrl: './responsible-students.component.html',
})
export class ResponsibleStudentsComponent implements OnInit {
  @Input() form: FormArray<FormGroup<ResponsibleStudent>> = new FormArray<FormGroup<ResponsibleStudent>>([]);
  @Input() users: IUser[] = [];
  newUser: FormGroup<ResponsibleStudent> = this.fb.group(new ResponsibleStudent())
  addToggle: boolean = false

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {

    console.log({users: this.users})
    console.log({formResponsible: this.form.value})

  }

  get f(): NgIterable<IResponsibleStudent> {
    return this.form?.value as NgIterable<IResponsibleStudent>
  }

  add(input: string) {
    this.newUser = this.fb.group<ResponsibleStudent>(new ResponsibleStudent())
    this.newUser.get('user')?.patchValue(this.users[parseInt(input)] as any)
  }


  setNewUser(input: string | null) {
    if (input) {
      if (!this.form?.at(0)?.value?.user?.id) this.form?.removeAt(0);
      this.form.push(this.newUser);
      const newForm = this.fb.group({user: this.fb.array(this.users)});
      (newForm.get('user') as FormArray)?.removeAt(parseInt(input))
      this.users = newForm.get('user')?.value as any
    }
    this.newUser = this.fb.group(new ResponsibleStudent())
    this.addToggle = !this.addToggle;
  }

  protected readonly environment = environment;
}
