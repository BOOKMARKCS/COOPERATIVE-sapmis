import { Component, Input, NgIterable } from '@angular/core';
import { JsonPipe, NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { FormArray, FormBuilder, FormGroup, FormsModule } from "@angular/forms";
import { InputComponent } from "../../../../../shared/components/inputs/input/input.component";
import { ButtonComponent } from "../../../../../shared/components/button/button.component";
import { IProjectAdvisor, ProjectAdvisor } from "../../../../../core/models/projectDetail/project-detail.model";
import { environment } from '../../../../../../environments/environment';
import { SvgIconComponent } from "../../../../../shared/components/svg-icon/svg-icon.component";
import { IUser } from "../../../../../core/models/auth/user.model";

@Component({
  selector: 'app-project-advisor',
  standalone: true,
  imports: [InputComponent, NgForOf, ButtonComponent, FormsModule, NgIf, NgOptimizedImage, JsonPipe, SvgIconComponent, SvgIconComponent],
  templateUrl: './project-advisor.component.html',
})
export class ProjectAdvisorComponent {
  @Input() form: FormArray<FormGroup<ProjectAdvisor>> = new FormArray<FormGroup<ProjectAdvisor>>([])
  newUser: FormGroup<ProjectAdvisor> = this.fb.group(new ProjectAdvisor())
  @Input() users: any = [];
  addToggle: boolean = false;

  constructor(private fb: FormBuilder) {
  }

  get f(): NgIterable<IProjectAdvisor> {
    return this.form?.value as NgIterable<IProjectAdvisor>
  }

  add(input: string) {
    this.newUser = this.fb.group<ProjectAdvisor>(new ProjectAdvisor())
    this.newUser.get('user')?.patchValue(this.users[parseInt(input)] as any)
  }


  setNewUser(input: string | null) {
    if (input) {
      if (!this.form?.at(0)?.value?.user?.id) this.form?.removeAt(0);
      this.form.push(this.newUser);
      const newForm = this.fb.group({user: this.fb.array(this.users)});
      newForm.controls.user.removeAt(parseInt(input))
      this.users = newForm.controls.user.value
    }
    this.newUser = this.fb.group(new ProjectAdvisor())
    this.addToggle = !this.addToggle;
  }

  protected readonly environment = environment;
}
