import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, of, ReplaySubject } from "rxjs";
import { environment } from "../../../../environments/environment";
import { Register } from "../../../core/domain/entities/account/register";
import { Login } from "../../../core/domain/entities/account/login";
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class AccountService  {
  private userSource = new ReplaySubject<any>(1);
  user$ = this.userSource.asObservable();

  constructor(private http: HttpClient, public router: Router) {

  }


  refreshUser(jwt: string | null) {
    if (jwt === null) {
      this.userSource = new ReplaySubject();
      return of(undefined);
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwt);
    return this.http.get<any>(`account/refresh-user-token`, {headers}).pipe(
      map((user: any) => {
        if (user) this.setUser(user);
      })
    )
  }

  login(model: Login) {
    return this.http.post<any>(`account/login`, model).pipe(map((user: any) => {
      this.setUser(user);
      return user
    }));
  }


  logout() {
    localStorage.removeItem(environment.userKey);
    this.userSource = new ReplaySubject()
    window.location.href = 'account/login'
  }

  register = (model: Register) => this.http.post(`account/register`, model);


  getJWT() {
    const key = localStorage.getItem(environment.userKey);
    if (key) {
      const user: any = JSON.parse(key);
      return user.jwt;
    } else return null;
  }

  private setUser(user: any) {
    localStorage.setItem(environment.userKey, JSON.stringify(user));
    this.userSource.next(user);
  }
}
