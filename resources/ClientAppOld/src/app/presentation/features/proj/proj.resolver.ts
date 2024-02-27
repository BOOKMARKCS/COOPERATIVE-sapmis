import { ResolveFn } from '@angular/router';
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { ProjService } from "./proj.service";
import { ProjPath } from "../../../core/domain/stateManagement/ProjPath";

export const projResolver: ResolveFn<Observable<any>> = () => {
  return inject(ProjService).get(ProjPath.GetTalent)
};
export const relatedReports: ResolveFn<Observable<any>> = () => {
  return inject(ProjService).get(ProjPath.GetRelatedReports)
}
