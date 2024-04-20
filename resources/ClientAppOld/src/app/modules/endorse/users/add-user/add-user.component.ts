import {Component} from '@angular/core';
import {HeaderComponent} from "../../../layout/components/header/header.component";
import {TableComponent} from "../../../../shared/components/table/table.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {EndorseService} from "../../endorse.service";
import {AuthService} from "../../../../core/services/auth.service";
import {tap} from "rxjs/operators";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    HeaderComponent,
    TableComponent,
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.sass'
})
export class AddUserComponent {
  positions: any = [{id: [], name: []}]
  form: FormGroup
  protected faculties: any;
  protected user: any;

  constructor(private sv: EndorseService, private authService: AuthService, fb: FormBuilder, private router: Router) {
    this.authService.user$.pipe(
      tap(u => this.user = u?.user), switchMap(() => this.sv.getMasterUser())
    ).subscribe(({positions, roles, faculties}: any) => Object.assign(this, {positions, roles, faculties}));
    this.form = fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['password'],
      password_confirmation: ['password'],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      signature: [''],
      organization_id: [this.user.organization_id],
      position_id: [null, Validators.required],
      faculty_id: [null],
      academic_year: [2566, Validators.required],
      role_id: [null]
    });
  }

  submit() {
    this.form.get('role_id')?.setValue(this.setRole(this.user.organization_id, this.getPositionValue?.id))
    if (this.form.valid) this.sv.addUser(this.form.value).subscribe({ next: () => this.router.navigateByUrl('endorse') })
  }

  setRole(organization: string, position: string): string {
    const roles: any = {
      '2': ['2', '3'],
      '3': ['5', '6', '7', '8', '9'],
      '4': ['11', '12'],
      '5': ['14', '15'],
      '6': ['23', '24'],
      '7': ['4', '10', '13', '16', '19', '22', '25'],
      'default': ['7']
    };
    return roles[organization]?.includes(position) ? '2' : roles['default'].includes(position) ?   '7' : '4';
  }

  get getPositionValue() {
    return this.positions[this.user.organization.name]?.find((p: any) => p.id === this.form.get('position_id')?.value);
  }
}
