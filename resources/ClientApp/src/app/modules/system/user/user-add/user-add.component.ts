import { Component, NgIterable, OnInit, ViewContainerRef } from '@angular/core';
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { HeaderComponent } from "../../layout/components/header/header.component";
import { JsonPipe, NgClass, NgForOf, NgIf, NgTemplateOutlet } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { IOrganization, IRole, TypeUser, User } from "../../../../core/models/auth/user.model";
import { UserService } from "../user.service";
import { lastValueFrom } from "rxjs";
import { AuthService } from "../../../../core/services/auth.service";
import { AlertService } from "../../../../shared/components/alert/alert.service";

interface RolePermissionMap {
  [key: string]: TypeUser;
}

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [ButtonComponent, HeaderComponent, NgForOf, NgIf, ReactiveFormsModule, NgClass, JsonPipe, NgTemplateOutlet],
  templateUrl: './user-add.component.html',
})
export class UserAddComponent implements OnInit {
  organizations: IOrganization[] = []
  roles: NgIterable<IRole>[] = []
  form: FormGroup
  typeUser: string = '';
  auth: any;
  protected faculties: any;

  constructor(private usv: UserService, auth: AuthService, fb: FormBuilder, private readonly alertService: AlertService) {
    this.form = fb.group(new User())
    auth.user$.subscribe(u => this.auth = u)
  }

  get getTypeUser() {
    return this.typeUser
  }

  async ngOnInit() {
    Object.assign(this, await lastValueFrom(this.usv.master()));
  }

  get getOrganizationId() {
    return this.form.get(['role', 'organizationId'])?.value
  }

  submit() {
    if (this.auth.user.role.organizationId !== '1') {
      this.form.get('roleId')?.setValue(this.setRole().id)
      this.form.get(['type'])?.setValue(this.auth.user.type)
      this.form.get([this.typeUser, 'academicYear'])?.setValue(this.auth.user[this.auth.user.type].academicYear)
      this.form.get([this.typeUser, 'facultyId'])?.setValue(this.auth.user[this.auth.user.type].facultyId)
    } else {
      this.form.get(['type'])?.setValue(this.typeUser)
      this.form.get([this.typeUser, 'academicYear'])?.setValue(2566)
    }
    console.log({form: this.form.value})
    this.usv.store(this.form.value).subscribe({
      next: () => {
        this.alertService.success('บันทึกข้อมูลผู้ใช้สำเร็จ')
        this.form.reset()
      },
      error: (err) => {
        this.alertService.error('บันทึกข้อมูลผู้ใช้ไม่สำเร็จ')
        console.log({err})
      }
    })
  }

  setRole() {
    const role = Object.values(this.roles[this.auth.user.type === TypeUser.Student ? this.auth.user.role.organizationId : this.getOrganizationId] || {}).find(r => r.positionId === (this.auth.user.type === TypeUser.Student ? '14' : this.form.get(['role', 'positionId'])?.value));
    const permissionMap: RolePermissionMap = {'Affairs': TypeUser.Officer, 'OrganizationAdvisor': TypeUser.Advisor, 'ProjectAdvisor': TypeUser.Advisor};
    this.typeUser = permissionMap[role?.permission] || TypeUser.Student;
    this.form.get('roleId')?.setValue(role.id)
    return role;
  }

  protected readonly TypeUser = TypeUser;
}
