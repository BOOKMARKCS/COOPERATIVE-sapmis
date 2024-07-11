import { Component, NgIterable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { JsonPipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { IOrganization, IRole, TypeUser, User } from "../../../../../core/models/auth/user.model";
import { lastValueFrom } from "rxjs";
import { ButtonComponent } from "../../../../../shared/components/button/button.component";
import { UserService } from "../../../../system/user/user.service";
import { HeaderComponent } from "../../../../system/layout/components/header/header.component";
import { UserAddComponent } from "../../../../system/user/user-add/user-add.component";

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [NgClass, FormsModule, ReactiveFormsModule, NgForOf, NgIf, JsonPipe, HeaderComponent, ButtonComponent, RouterLink, UserAddComponent],
  templateUrl: './add-user.component.html',
})
export class AddUserComponent implements OnInit {
  organizations: IOrganization[] = []
  roles: NgIterable<IRole>[] = []
  form: FormGroup
  typeUser: string = '';
  protected faculties: any;

  constructor(private usv: UserService, fb: FormBuilder) {
    this.form = fb.group(new User())
  }

  get getTypeUser() {
    return this.typeUser
  }

  async ngOnInit() {
    Object.assign(this, await lastValueFrom(this.usv.master()));
  }


  submit() {
    // this.form.get('role_id')?.setValue(this.setRole(this.getOrganizationValue?.id, this.getPositionValue?.id))
    // this.form.get('organizationId')?.setValue(this.form.get('organizationId')?.value)
    // // console.log({"setRole": this.setRole(this.getOrganizationValue?.id, this.getPositionValue?.id)})
    // if (this.form.invalid) return;
    this.form.get('academicYear')?.setValue(2566)
    this.form.get(['type'])?.setValue(this.getTypeUser)
    this.form.get('roleId')?.setValue(this.setRole())
    console.log({form: this.form.value})
    // this.usv.store(this.form.value).subscribe(res => {
    //   console.log({res})
    // })
  }

  setRole() {
    let role;
    if (this.roles[this.form.get(['role', 'organizationId'])?.value]) role = Object(this.roles[this.form.get(['role', 'organizationId'])?.value]).find((r: any) => r.positionId == this.form.get(['role', 'positionId'])?.value)
    if (['Affairs'].includes(role.permission)) this.typeUser = TypeUser.Officer
    else if (role.permission === 'OrganizationAdvisor') this.typeUser = TypeUser.Advisor
    else if (role.permission === 'ProjectAdvisor') this.typeUser = TypeUser.Advisor
    else this.typeUser = TypeUser.Student
    return role.id
  }

}
