import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProjectProposerService {

  constructor(private http:HttpClient) { }

  getProjectApprovals(){
    return {
      projectId : 1,
    }
  }
}
