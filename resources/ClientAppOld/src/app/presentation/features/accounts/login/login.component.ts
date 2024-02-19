import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService } from "../../../../core/authentication/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ToastrService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent implements OnInit{
  form: FormGroup;

  constructor(fb: FormBuilder, private authService : AuthService, private router : Router) {
    this.form = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {

    // ตรวจสอบว่ามีข้อมูลการเข้าสู่ระบบอยู่ใน localStorage หรือไม่
    // getItem('ClientAppUser');

    // console.log({localStorage:localStorage.getItem('ClientAppUser')})
    if (localStorage.length) {
      this.router.navigate(['/']);
    }
  }
  login(): void {
    // this.authService.login(this.form.value).subscribe(next => {window.location.href = '/'});
  }
}
