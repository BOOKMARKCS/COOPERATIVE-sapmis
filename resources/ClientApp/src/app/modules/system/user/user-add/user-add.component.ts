import { Component, NgIterable, OnInit } from '@angular/core';
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

  constructor(private usv: UserService, authService: AuthService, private fb: FormBuilder, private readonly alertService: AlertService) {
    this.form = this.fb.group(new User())
    this.auth = authService.user()
  }

  async ngOnInit() {
    Object.assign(this, await lastValueFrom(this.usv.master()));
  }


  get getOrganizationId() {
    return this.form.get(['role', 'organizationId'])?.value
  }

  get getPositionId() {
    return this.form.get(['role', 'positionId'])?.value
  }

  submit() {
    if (this.auth.role.organizationId !== '1') {
      this.form.get('roleId')?.setValue(this.getRole.id)
      console.log({formPermission: this.form.get(['roleId', 'permission'])?.setValue(this.setRole().permission)})
      this.form.get(['type'])?.setValue(this.getRole.type)
      this.form.get([this.typeUser, 'academicYear'])?.setValue(this.auth[this.auth.type].academicYear)
      this.form.get([this.typeUser, 'facultyId'])?.setValue(this.auth[this.auth.type].facultyId)
    } else {
      this.form.get(['type'])?.setValue(this.getRole.type)
      this.form.get([this.typeUser, 'academicYear'])?.setValue(2566)
    }
    console.log({form: this.form.value})
    this.usv.store(this.form.getRawValue()).subscribe({
      next: () => {
        this.alertService.success('บันทึกข้อมูลผู้ใช้สำเร็จ')
        this.form = this.fb.group(new User())
      },
      error: () => this.alertService.error('บันทึกข้อมูลผู้ใช้ไม่สำเร็จ')
    })
  }

  get getRole() {
    return Object.values(this.roles[this.getOrganizationId]).find(r => r.positionId === this.getPositionId)
  }

  setRole() {
    const role = Object.values(this.roles[this.auth.type === TypeUser.Student ? this.auth.role.organizationId : this.getOrganizationId] || {}).find(r => r.positionId === (this.auth.type === TypeUser.Student ? '14' : this.form.get(['role', 'positionId'])?.value));
    const permissionMap: RolePermissionMap = {'Affairs': TypeUser.Officer, 'OrganizationAdvisor': TypeUser.Advisor, 'ProjectAdvisor': TypeUser.Advisor};
    this.typeUser = permissionMap[role?.permission] || TypeUser.Student;
    this.form.get('roleId')?.setValue(role.id)
    return role;
  }

  protected readonly TypeUser = TypeUser;
}
