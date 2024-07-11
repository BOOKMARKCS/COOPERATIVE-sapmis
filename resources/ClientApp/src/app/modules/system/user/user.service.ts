import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { IGroupUser, IOrganization } from "../../../core/models/auth/user.model";
import { catchError, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  get(searchTerm?: string): Observable<IGroupUser> {
    let params = new HttpParams();
    if (searchTerm) params = params.set('search', searchTerm);
    return this.http.get<IGroupUser>('http://127.0.0.1:8000/api/user', {params})
      .pipe(catchError((error: any) => {throw error}));
  }

  store = (userData: any) => this.http.post('user', userData)
  master = () => this.http.get('master-user')
  organization = () => this.http.get<IOrganization[]>('organizations')
}
