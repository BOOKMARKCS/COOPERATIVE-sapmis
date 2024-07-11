import {ResolveFn} from '@angular/router';
import {inject} from "@angular/core";
import {ProjectService} from "./project.service";
import {IMaster} from "../../../core/models/projectDetail/project-detail.model";
import { IProject } from "../../../core/models/project/project.model";

export const projectMaterResolver: ResolveFn<IMaster> = (route, state) => inject(ProjectService).master()

export const projectListResolver: ResolveFn<IProject[]> = (route, state) => inject(ProjectService).get()
