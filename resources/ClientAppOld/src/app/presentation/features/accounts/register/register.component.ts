import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.sass'
})
export class RegisterComponent {
  form: FormGroup;
  constructor(fb: FormBuilder, private http : HttpClient) {
    this.form = fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      phone_number: ['', Validators.required],
      signature: [''],
      affiliation: ['', Validators.required],
      position: ['', Validators.required],
      academic_year: ['', Validators.required]
    });
  }

  submitLogin() {
    if (this.form.valid) {
      this.http.post('http://localhost:8000/api/register', this.form.value, {responseType: 'text'}).subscribe(
        response => {
          console.log('Text response:', response);
          window.location.href = ''
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
  }
}
