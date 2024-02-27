import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from "../../../../core/services/auth.service";
import {NgClass, NgIf} from "@angular/common";
import {SvgIconComponent} from "angular-svg-icon";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;

  constructor(private readonly _formBuilder: FormBuilder, private readonly _router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.checkUserAuthentication()
    this.form = this._formBuilder.group({
      email: ['', Validators.email],
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

    // stop here if form is invalid
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe({
        next: () => this._router.navigateByUrl('')
      })
    }

    // this._router.navigate(['/']);
  }
}
