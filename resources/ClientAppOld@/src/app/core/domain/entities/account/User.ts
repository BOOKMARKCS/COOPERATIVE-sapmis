import { FormControl, FormGroup } from "@angular/forms";

export interface IUser {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  roleId: string;
  role: string;
  jwt: string
}

export class User {
  users: any = new FormGroup({
    id: new FormControl(''),
    userName: new FormControl(''),
    normalizedUserName: new FormControl(''),
    email: new FormControl(''),
    normalizedEmail: new FormControl(''),
    phoneNumber: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    roleId: new FormControl(''),
    role: new FormControl(''),
  })
}
