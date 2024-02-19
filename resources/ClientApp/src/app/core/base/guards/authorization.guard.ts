import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AccountService } from "../../../presentation/features/account/account.service";
import { DOCUMENT } from "@angular/common";
import { map } from "rxjs/operators";

export const authorizationGuard: CanActivateFn = (route, state) => {
  const {doc, r} = {doc: inject(DOCUMENT), r: inject(Router)};
  return inject(AccountService).user$.pipe(map(u => u ? !state.url.split('/').includes(u.user.role.name) ? r.createUrlTree([u.user.role.name]) : true : (doc.location.href = 'account/login' , false)));
}
