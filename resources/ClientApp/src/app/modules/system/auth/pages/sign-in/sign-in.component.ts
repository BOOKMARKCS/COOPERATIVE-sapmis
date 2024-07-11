import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { ButtonComponent } from "../../../../../shared/components/button/button.component";
import { AuthService } from "../../../../../core/services/auth.service";
import { AlertService } from "../../../../../shared/components/alert/alert.service";
import { SvgIconComponent } from "../../../../../shared/components/svg-icon/svg-icon.component";
import { IUser } from "../../../../../core/models/auth/user.model";
import { Login } from "../../../../../core/models/auth/login.model";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, NgClass, NgIf, ButtonComponent, SvgIconComponent],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;
  userAuth: IUser | null

  constructor(private router: Router, private authService: AuthService, private alertService: AlertService) {
    this.userAuth = this.authService.user()
    this.form = new FormGroup<Login>(new Login())
  }

  ngOnInit(): void {
    this.checkUserAuthentication()
  }

  checkUserAuthentication = () => this.authService.token() ? this.router.navigateByUrl('/') : true

  togglePasswordTextType = () => this.passwordTextType = !this.passwordTextType;

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;
    this.authService.login(this.form.value).subscribe({
      next: () => {
        window.location.href = this.userAuth?.role?.permission.toLocaleLowerCase() ?? ''
        this.alertService.success('เข้าสู่ระบบสำเร็จ');
      }, error: () => this.alertService.error('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
    })
  }

}
