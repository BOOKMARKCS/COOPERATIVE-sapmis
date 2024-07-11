import { FormControl, Validators } from "@angular/forms";

export interface ILogin {
  email: string;
  password: string;
}

export class Login {
  email = new FormControl<string>('', [Validators.required, Validators.email])
  password = new FormControl<string>('', Validators.required)
}

