import { Inject, Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment.development";
import { map, of, ReplaySubject } from "rxjs";
import { Login } from "../../../core/domain/entities/account/login";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";

@Injectable({providedIn: 'root'})
export class AccountService {
  userSource = new ReplaySubject<any>(1);
  user$ = this.userSource.asObservable()
  localStorage: any

  constructor(private http: HttpClient, public router: Router, @Inject(DOCUMENT) public document: Document) {
    this.localStorage = this.document.defaultView?.localStorage
  }

  refreshUser(jwt: string | null) {
    if (jwt === null) {
      this.userSource.next(null);
      return of(undefined)
    }
    return this.http.get<any>(`refresh`).pipe(map((u: any) => !!u && this.setUser(u)))
  }

  login = (obj: Login) => this.http.post<any>(`login`, obj).pipe(map((u: any) => !!u && this.setUser(u)));

  logout() {
    localStorage.removeItem(environment.userKey);
    this.userSource.next(null)
    this.router.navigateByUrl('account/login')
  }

  getJWT() {
    let key
    if (this.localStorage) key = this.localStorage.getItem(environment.userKey);
    if (key) {
      const user: any = JSON.parse(key).jwt;
      return user;
    } else return null;
  }

  private setUser(user: any) {
    localStorage.setItem(environment.userKey, JSON.stringify(user));
    this.userSource.next(user);
  }

  getRole() {
    return this.http.get('roles')
  }
}
