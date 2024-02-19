import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AccountService } from "../account.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  form: FormGroup;

  constructor(fb : FormBuilder, private accountService:AccountService) {
    this.form = fb.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    })
  }

  submit() {
    console.log({form:this.form.value})
    this.accountService.login(this.form.value).subscribe({
      next: (res) => {
        console.log({res})
      },
      error: (error) => {
        console.log({error})
      }
    });
  }
}
