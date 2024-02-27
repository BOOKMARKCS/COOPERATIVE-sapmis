import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get('http://localhost:8000/api/user')
  }

  getMasterUser()  {
    return this.http.get('http://localhost:8000/api/master-user')
  }

  addUser(user: any) {
    // const jwt: any = localStorage.getItem('ClientAppUser')
    // let headers = new HttpHeaders();
    // headers = headers.set('Authorization', 'Bearer ' + jwt);
    return this.http.post('http://localhost:8000/api/user', user)
  }
}
