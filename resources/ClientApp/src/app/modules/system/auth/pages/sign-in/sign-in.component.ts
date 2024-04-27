import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {NgClass, NgIf} from '@angular/common';
import {ButtonComponent} from "../../../../../shared/components/button/button.component";
import {AuthService} from "../../../../../core/services/auth.service";
import {AlertService} from "../../../../../shared/components/alert/alert.service";
import { SvgIconComponent } from "../../../../../shared/components/svg-icon/svg-icon.component";

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

  constructor(private readonly _formBuilder: FormBuilder, private readonly _router: Router, private authService: AuthService, private alertService: AlertService, private vcr: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.alertService.setVCR(this.vcr)
    this.checkUserAuthentication()
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  checkUserAuthentication() {
    if (this.authService.getJWT()) {
      this._router.navigateByUrl('')
    }
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;
    this.authService.login(this.form.value).subscribe({
      next: () => {
        window.location.href = ''
        this.alertService.success('เข้าสู่ระบบสำเร็จ');
      },
      error: () => this.alertService.error('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
    })
  }
}
