import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProposerService {

  constructor(private http : HttpClient) { }

  getProject(){
    return this.http.get('project');
  }
  store = (obj:any) => this.http.post('project',obj)

  master(){
    return this.http.get('master-project')
  }

}
