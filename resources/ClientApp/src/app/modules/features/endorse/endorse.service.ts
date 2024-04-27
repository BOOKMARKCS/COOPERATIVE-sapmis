import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EndorseService {

  constructor(private http: HttpClient) { }

  getUser(){
    return this.http.get('user')
  }

  getMasterUser()  {
    return this.http.get('master-user')
  }

  addUser(user:any) {
    return this.http.post('http://localhost:8000/api/user', user)
  }

  getProject(){
    return this.http.get('project')
  }
}
