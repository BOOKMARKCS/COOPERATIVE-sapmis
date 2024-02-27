import { FormControl, FormGroup } from "@angular/forms";

export interface IUser {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  signature: string;
  organizationId: number;
  positionId: number;
  academicYearId: number
}

export class User {
  users: any = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    signature: new FormControl(''),
    organizationId: new FormControl(null),
    positionId: new FormControl(null),
    academicYearId: new FormControl(null),
  })
}
