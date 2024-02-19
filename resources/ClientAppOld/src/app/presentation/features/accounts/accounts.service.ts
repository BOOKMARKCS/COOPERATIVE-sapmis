import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { of, ReplaySubject } from "rxjs";
import { environment } from "../../../../environments/environment";
import { map } from "rxjs/operators";
import { Login } from "../../../data/entities/account/login";
import { Router } from "@angular/router";
import { Register } from "../../../data/entities/account/register";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private apiUrl = 'http://localhost:8000/api';
  private userSource = new ReplaySubject<any>(1);
  user$ = this.userSource.asObservable();

/*  constructor(private http: HttpClient, public router: Router) {

  }

  refreshUser(jwt: string | null) {
    if (jwt === null) {
      this.userSource = new ReplaySubject();
      return of(undefined);
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwt);
    return this.http.get<any>(`${this.apiUrl}/refresh`, {headers}).pipe(
      map((user: any) => {
        if (user) this.setUser(user);
      })
    )
  }

  login(model: Login) {
    return this.http.post<any>(`${this.apiUrl}/login`, model).pipe(map((user: any) => {
      this.setUser(user);
      return user
    }));
  }


  logout() {
    localStorage.removeItem(environment.userKey);
    this.userSource = new ReplaySubject()
    window.location.href = 'account/login'
  }

  register = (model: Register) => this.http.post(`${this.apiUrl}/register`, model);


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
  }*/

}
