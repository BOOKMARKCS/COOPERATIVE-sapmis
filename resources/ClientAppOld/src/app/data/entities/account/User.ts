import { FormControl, FormGroup } from "@angular/forms";

export interface IUser {
  id: string;
  nameSurname: string;
  email: string;
  phoneNumber: string;
  roleId: string;
  role: string;
  jwt: string
}

export class User {
  users: any = new FormGroup({
    id: new FormControl(''),
    nameSurname: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    roleId: new FormControl(''),
    role: new FormControl(''),
  })
}
