import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IGroupUser, IOrganization, User } from "../../../core/models/auth/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  get = () => this.http.get<IGroupUser>('user')
  store = (userData: any) => this.http.post('user', userData)
  master = () => this.http.get('master-user')
  organization = () => this.http.get<IOrganization[]>('organizations')
}
