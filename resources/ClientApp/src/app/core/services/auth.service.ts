import {Injectable} from '@angular/core';
import {map, of, ReplaySubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Login} from "../models/auth/login.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSource = new ReplaySubject<any>(1);
  user$ = this.userSource.asObservable()

  constructor(private http: HttpClient, public router: Router) {
  }

  refreshUser(jwt: string | null) {
    if (jwt === null) {
      this.userSource.next(null);
      return of(undefined)
    }
    return this.http.get<any>(`refresh`).pipe(map((u: any) => !!u && this.setUser(u)))
  }

  login = (obj: Login) => this.http.post<any>(`login`, obj).pipe(map((u: any) => this.setUser(u)));

  logout() {
    localStorage.removeItem(environment.userKey);
    this.userSource.next(null)
    this.router.navigateByUrl('auth/')
  }

  getJWT() {
    let key
    if (localStorage) key = localStorage.getItem(environment.userKey);
    if (key) {
      return JSON.parse(key).jwt;
    } else return null;
  }

  private setUser(user: any) {
    localStorage.setItem(environment.userKey, JSON.stringify(user));
    this.userSource.next(user);
    return user
  }
}
