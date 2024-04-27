import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdvisorService {

  constructor(private http : HttpClient) { }

  getProject(){
    return this.http.get('project')
  }
}
