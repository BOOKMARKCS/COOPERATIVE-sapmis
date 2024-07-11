import { Injectable, signal } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ILogin } from "../models/auth/login.model";
import { environment } from "../../../environments/environment";
import { map } from "rxjs/operators";
import { lastValueFrom } from "rxjs";
import { IUser } from "../models/auth/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = signal<IUser | any>(null);

  constructor(private http: HttpClient, public router: Router) {
  }

  refreshUser = () => this.http.get(`refresh`).pipe(map((u: any) => !!u && this.setUser(u)));
  // else if (this.user()) this.refreshUser().subscribe({next: u => u ? u : this.logout(), error: _ => this.logout()});

  login = (obj: ILogin) => this.http.post(`login`, obj).pipe(map((u: any) => this.setUser(u)));

  logout = () => this.router.navigateByUrl('/auth/sign-in').then(() => localStorage.removeItem(environment.userKey));

  me = () => this.http.get<IUser>('me')

  token = () => localStorage.getItem(environment.userKey)

  async loadUserFromLocalStorage() {
    if (this.token()) this.user.set(await lastValueFrom(this.me()))
  }

  private async setUser(token: any) {
    localStorage.setItem(environment.userKey, JSON.stringify(token));
    this.user.set(await lastValueFrom(this.me()))
    return token;
  }
}
