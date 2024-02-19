import { Injectable } from '@angular/core';
import { config, Observable, shareReplay, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";
import moment from "moment";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const ROLES_KEY = 'auth-roles';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/account/login';

  // constructor(private http: HttpClient) {}
  //
  // login(credentials: { email: string, password: string }): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/login`, credentials);
  // }
  //
  // // other auth methods...
  //
  // // Store token in local storage
  // setToken(token: string): void {
  //   localStorage.setItem('token', token);
  // }
  //
  // // Retrieve token from local storage
  // getToken(): string | null {
  //   return localStorage.getItem('token');
  // }
  //
  // // Remove token from local storage
  // removeToken(): void {
  //   localStorage.removeItem('token');
  // }
}
