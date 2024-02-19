import { Inject, Injectable } from '@angular/core';
import { environment } from "../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  localStorage: any
  constructor(public router: Router, @Inject(DOCUMENT) public document: Document) {
    this.localStorage = this.document.defaultView?.localStorage
  }

  getJWT() {
    let key
    if (this.localStorage) {
      key = this.localStorage.getItem(environment.userKey);
    }
    if (key) {
      const user: any = JSON.parse(key).jwt;
      return user;
    } else return null;
  }

}
