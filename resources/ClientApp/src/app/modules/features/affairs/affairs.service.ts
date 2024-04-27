import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IGroupUser, IOrganization, IUser, User} from "../../../core/models/auth/user.model";

@Injectable({
  providedIn: 'root'
})
export class AffairsService {

  constructor(private http:HttpClient) { }

  getUser(){
    return this.http.get<IGroupUser>('user')
  }

  getMasterUser()  {
    return this.http.get('master-user')
  }

  getOrganization() {
    return this.http.get<IOrganization[]>('organizations')
  }

  addUser(user:any) {
    return this.http.post('user', user)
  }

  getProject(){
    return this.http.get('project')
  }
}
