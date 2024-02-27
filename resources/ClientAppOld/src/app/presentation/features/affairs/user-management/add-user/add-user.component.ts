import { Component } from '@angular/core';
import { UserManagementService } from "../user-management.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.sass'
})
export class AddUserComponent {
  organizations: any = {id: [], name: []}
  positions: any = {id: [], name: []}
  roles: any = {id: [], name: []}
  form: FormGroup
  positionsGroup: any

  constructor(private ums: UserManagementService, fb: FormBuilder, private router: Router) {
    this.ums.getMasterUser().subscribe(({positions, organizations, roles}: any) => {
      this.positions = {id: Object.keys(positions), name: Object.values(positions)};
      this.organizations = {id: Object.keys(organizations), name: Object.values(organizations)};
      this.roles = {id: Object.keys(roles), name: Object.values(roles)}
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
      role_id: [null]
    });
    this.positionsGroup = {
      'องค์การนิสิต': ['นายกองค์การนิสิต', 'รองนายกองค์การนิสิต', 'ประธานฝ่ายกีฬาและนันทนาการ', 'ประธานฝ่ายบำเพ็ญประโยชน์', 'ประธานฝ่ายศิลปวัฒนธรรม'],
      'สภานิสิต': ['ประธาน', 'รองประธาน'],
      'ชมรม': ['ประธาน', 'รองประธาน'],
      'สโมสรนิสิต': ['ประธานสโมสรนิสิต', 'รองประธานสโมสรนิสิต'],
      'คณะกรรมการกลั่นกรองกิจกรรมนิสิต ภาคสมทบ': ['ประธาน', 'รองประธาน'],
      'คณะกรรมการบริหารกิจกรรมนิสิต ภาคสมทบ': ['ประธาน', 'รองประธาน'],
      'คณะกรรมการบริหารกิจกรรมนิสิตระดับบัณฑิตศึกษา': ['ประธาน', 'รองประธาน'],
    }
  }

  submit() {
    this.form.get('role_id')?.setValue(this.setRole(this.organizations.name[this.form.get('organization_id')?.value], this.positions.name[this.form.get('position_id')?.value]))
    this.form.get('organization_id')?.setValue(this.form.get('organization_id')?.value)
    if (this.form.valid) this.ums.addUser(this.form.value).subscribe({
      next: () => this.router.navigateByUrl('affairs')
    })

  }

  setRole(organization: string, position: string): number {
    switch (organization) {
      case 'กิจการนิสิต': return 1;
      case 'สภานิสิต': return (position === 'ประธาน' || position === 'รองประธาน') ? 2 : 7;
      case 'องค์การนิสิต': return (position === ('นายกองค์การนิสิต' || 'รองนายกองค์การนิสิต' || 'ประธานฝ่ายกีฬาและนันทนาการ' || 'ประธานฝ่ายบำเพ็ญประโยชน์' || 'ประธานฝ่ายศิลปวัฒนธรรม')) ? 2 : 7;
      case 'สโมสรนิสิต': return (position === 'ประธาน' || position === 'รองประธาน') ? 2 : 7;
      case 'ชมรม': return (position === 'ประธาน' || position === 'รองประธาน') ? 2 : 7;
      case 'คณะกรรมการกลั่นกรองกิจกรรมนิสิต ภาคสมทบ':
      case 'คณะกรรมการบริหารกิจกรรมนิสิต ภาคสมทบบ':
      case 'คณะกรรมการบริหารกิจกรรมนิสิตระดับบัณฑิตศึกษา': return (position === 'ประธาน' || position === 'รองประธาน') ? 2 : 7;
      default: return (position === 'ผู้เสนอโครงการ') ? 4 : 7;
    }
  }


  protected readonly parseInt = parseInt;
}
