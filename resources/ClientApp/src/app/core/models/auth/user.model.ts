import { FormControl, FormGroup, Validators } from "@angular/forms";

export enum TypeUser {
  Student = 'student',
  Officer = 'officer',
  Advisor = 'advisor'
}

export enum Permission {
  Empty = '',
  Affairs = 'Affairs',
  Approver = ' Approver',
  Endorser = ' Endorser',
  OrganizationAdvisor = 'OrganizationAdvisor',
  ProjectAdvisor = 'ProjectAdvisor',
  Responsible = 'Responsible'
}

export interface IGroupUser {
  [p: string]: IUser[]
}

export interface IUser {
  id: string
  email: string
  password: string
  type: TypeUser
  roleId: string
  role: IRole
  officer: IOfficer
  advisor: IAdvisor
  student: IStudent
}

export class User {
  id = new FormControl(null)
  email = new FormControl(null,Validators.required)
  password = new FormControl(null)
  type = new FormControl<TypeUser | null>(null)
  roleId = new FormControl(null)
  role = new FormGroup(new Role())
  officer? = new FormGroup(new Officer())
  advisor? = new FormGroup(new Advisor())
  student? = new FormGroup(new Student())
}

export interface IRole {
  id: string
  permission: string
  organizationId: string
  organization: IOrganization
  positionId: string
  position: IPosition
}

export class Role {
  id = new FormControl(null)
  permission = new FormControl<Permission>(Permission.Empty)
  organizationId = new FormControl(null)
  organization = new FormGroup(new Organization())
  positionId = new FormControl(null)
  position = new FormGroup(new Position())
}

export interface IOfficer {
  userId: string
  name: string
  phoneNumber: string
  signature: string
  profile: string
}

export class Officer {
  userId = new FormControl(null)
  name = new FormControl(null)
  phoneNumber = new FormControl(null)
  signature = new FormControl(null)
  profile = new FormControl('/images/profile_default.png')
}

export interface IAdvisor {
  userId: string
  name: string
  phoneNumber: string
  signature: string
  profile: string
  academicYear: string
  facultyId: string
  clubId: string
}

export class Advisor {
  userId = new FormControl(null)
  name = new FormControl(null)
  phoneNumber = new FormControl(null)
  signature = new FormControl(null)
  profile = new FormControl('/images/profile_default.png')
  academicYear = new FormControl(null)
  facultyId = new FormControl(null)
  clubId = new FormControl(null)
}

export interface IStudent {
  userId: string
  name: string
  id: string
  phoneNumber: string
  profile: string
  academicYear: string
  facultyId: string
  faculty: object
  clubId: string
}

export class Student {
  userId = new FormControl(null)
  name = new FormControl(null)
  id = new FormControl(null)
  phoneNumber = new FormControl(null)
  signature = new FormControl(null)
  academicYear = new FormControl(null)
  profile = new FormControl('/images/profile_default.png')
  facultyId = new FormControl(null)
  clubId = new FormControl(null)
}

export enum OrganizationType {
  Affairs = 'กิจการนิสิต',
}

export interface IOrganization {
  id: string,
  name: string
}

export class Organization {
  id = new FormControl(null);
  name = new FormControl(null);
}

export interface IPosition {
  id: string,
  name: string
}

export class Position {
  id = new FormControl(null);
  name = new FormControl(null);
}
