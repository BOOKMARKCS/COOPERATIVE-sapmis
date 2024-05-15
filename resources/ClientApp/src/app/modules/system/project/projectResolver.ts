import { ResolveFn } from '@angular/router';
import {inject} from "@angular/core";
import {ProjectService} from "./project.service";
import { IMaster } from "../../../core/models/projectDetail/project-detail.model";

export const projectMaterResolver: ResolveFn<IMaster> = (route, state) => inject(ProjectService).master()
