import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AccountService } from "../account.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "../../../../core/message.service";
import { TranslateService } from "@ngx-translate/core";
import { HttpService } from "../../../../core/http/http.service";
import { HttpClientModule } from "@angular/common/http";
import * as http from "http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  error: any = {};
  returnUrl: string | null = null;

  constructor(public accountService: AccountService, private formBuilder: FormBuilder, private messageService: MessageService, private router: Router, private activatedRoute: ActivatedRoute) {
  }


  ngOnInit() {
    this.checkUserAuthentication();
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  checkUserAuthentication() {
    if(this.accountService.getJWT())  {
      this.router.navigateByUrl('')
    }
  }

  login() {
    this.error = {};
    if (this.form.valid)
      this.accountService.login(this.form.value).subscribe({
        next: () => {
          window.location.href = ''
          // this.messageService.success('เข้าสู่ระบบสำเร็จ');
        },
        error: () => {
          this.error.messages = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"
        }
      });
    else {
      if (this.form.get('email')?.invalid) {
        this.error.user = "กรุณากรอกชื่อผู้ใช้";
        this.messageService.warning(this.error.user)
      }
      if (this.form.get('password')?.invalid) {
        this.error.password = "กรุณากรอกรหัสผ่าน"
        this.messageService.warning(this.error.password)
      }
    }
  }

  refreshUser() {
    this.accountService.refreshUser(this.accountService.getJWT()).subscribe({error: _ => this.router.navigateByUrl('account/login')});
  }

}
