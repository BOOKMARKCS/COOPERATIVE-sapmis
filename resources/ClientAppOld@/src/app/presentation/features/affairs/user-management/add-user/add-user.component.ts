import { Component } from '@angular/core';
import { UserManagementService } from "../user-management.service";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { from, map, of } from "rxjs";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { toNumbers } from "@angular/compiler-cli/src/version_helpers";

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.sass'
})
export class AddUserComponent {
  organizations: any = {id: [], name: []}
  positions: any = {id: [], name: []}
  form: FormGroup
  positionsGroup: any

  constructor(private ums: UserManagementService, fb: FormBuilder) {
    this.ums.getMasterUser().subscribe((data: any) => {
      this.positions = {
        id: Object.keys(data.positions),
        name: Object.values(data.positions)
      };
      this.organizations = {
        id: Object.keys(data.organizations),
        name: Object.values(data.organizations)
      };
    });
    this.form = fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      phone_number: ['', Validators.required],
      signature: [''],
      organization_id: ['เลือกชื่อองค์กร', Validators.required],
      position_id: ['เลือกตำแหน่ง', Validators.required],
      academic_year_id: [66, Validators.required],
    });
    this.positionsGroup =  {
      'องค์การนิสิต': ['นายกองค์การนิสิต', 'รองนายกองค์การนิสิต', 'ประธานฝ่ายกีฬาและนันทนาการ', 'ประธานฝ่ายบำเพ็ญประโยชน์', 'ประธานฝ่ายศิลปวัฒนธรรม'],
      'สภานิสิต': ['ประธาน', 'รองประธาน'],
      'สโมสรนิสิต': ['ประธานสโมสรนิสิต', 'รองประธานสโมสรนิสิต']
    }
  }

  submit() {
    this.form.get('organization_id')?.setValue(this.form.get('organization_id')?.value[0])
    if (this.form.valid) {
      this.ums.addUser(this.form.value).subscribe(console.log)
    }

  }

  protected readonly parseInt = parseInt;
}
