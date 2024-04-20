import {Component, NgIterable, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router, } from "@angular/router";
import {AffairsService} from "../../affairs.service";
import {JsonPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {IOrganization, IRole,  TypeUser, User} from "../../../../core/models/auth/user.model";
import {HeaderComponent} from "../../../layout/components/header/header.component";
import {lastValueFrom, map} from "rxjs";
import {ButtonComponent} from "../../../../shared/components/button/button.component";

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    JsonPipe,
    HeaderComponent,
    ButtonComponent
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.sass'
})
export class AddUserComponent implements OnInit {
  organizations: IOrganization[] = []
  roles: NgIterable<IRole>[] = []
  form: FormGroup
  typeUser: string = '';
  protected faculties: any;

  constructor(private sv: AffairsService, fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {
    this.form = fb.group(new User())
  }
  get getTypeUser(){
    return this.typeUser
  }
  get getOrganizationId(){
    return  this.form.get(['role','organization_id'])?.value
  }

  async ngOnInit() {
    Object.assign(this, await lastValueFrom(this.sv.getMasterUser()));

// ดึงค่า roles, organizations, และ faculties จาก masterUserData
//     const { roles, organizations, faculties } = masterUserData;
//     this.roles = roles;
//     this.organizations = organizations;
//     this.faculties = faculties;
  }


  submit() {
    // this.form.get('role_id')?.setValue(this.setRole(this.getOrganizationValue?.id, this.getPositionValue?.id))
    // this.form.get('organization_id')?.setValue(this.form.get('organization_id')?.value)
    // // console.log({"setRole": this.setRole(this.getOrganizationValue?.id, this.getPositionValue?.id)})
    // if (this.form.valid) this.sv.addUser(this.form.value).subscribe({
    //   next: () => this.router.navigateByUrl('affairs')
    // })
  }

  setRole() {
    let role;
    if(this.roles?.[this.form.get(['role','organization_id'])?.value]) role = Object(this.roles?.[this.form.get(['role','organization_id'])?.value])?.find((r:any) => r?.position_id == this.form.get(['role','position_id'])?.value);
    if(role.permission === 'Affairs' || role.permission == 'Endorser') this.typeUser = TypeUser.Officer
    else if (role.permission === 'Advisor') this.typeUser = TypeUser.Advisor
    else if(role.permission === 'Proposer') this.typeUser = TypeUser.Student
  }

  // get getOrganizationValue() {
  //   return this.organizations.find(o => o.id === this.form.get('organization_id')?.value)
  // };

  // get getPositionValue() {
  //   // return this.getOrganizationValue?.name ? this.positions[this.getOrganizationValue.name].find((p: any) => p.id === this.form.get('position_id')?.value) : null;
  // }
  // get getTypeUser() {
  //   console.log({form:this.form.get(['role','organization_id'])?.value})
  //   console.log({role: this.roles?.[this.form.get(['role','organization_id'])?.value]});
  //   return 'officer';
  // }


  protected readonly parseInt = parseInt;
  protected readonly Object = Object;

  protected readonly TypeUser = TypeUser;
}
