import { ResolveFn } from '@angular/router';
import {inject} from "@angular/core";
import {ProjectService} from "./project.service";

export const projectMaterResolver: ResolveFn<any> = (route, state) => inject(ProjectService).master()
