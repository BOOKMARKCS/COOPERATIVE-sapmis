import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { IProject, Project } from "../../../core/models/project/project.model";
import {FormControl} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";
import {ProjectStatus} from "../../../core/models/project/projectStatus.model";
import {lastValueFrom, map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  get = () => this.http.get<IProject[]>('project')

  store = (projectData: any) => this.http.post('project', projectData)

  update = (project: any, projectId: any) => this.http.put(`project/${projectId}`, project)

  master = () => this.http.get<any>('master-project')

  setProjectStatus() {
    return this.auth.user$.pipe(map(u => {
      if (u.user['role']['organizationId'] == '5') {
        switch (u.user['role']['permission']) {
          case "Proposer": return ProjectStatus.StudentClub.Proposer
          case "Responsible" : return ProjectStatus.StudentClub.Responsible;
          case "Advisor" : return ProjectStatus.StudentClub.Advisor;
          case "Endorser" : return ProjectStatus.StudentClub.StudentClub;
          default:
            return null;
        }
      } else return null
    }))
  }
}
