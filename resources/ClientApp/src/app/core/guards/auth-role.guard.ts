import {CanActivateFn, Router} from '@angular/router';
import {map} from "rxjs";
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";

export const authRoleGuard: CanActivateFn = (route, state) => {
  const r = inject(Router)
  return inject(AuthService).user$.pipe(
    map(u => {
      const roleName = u?.user?.role?.permission.toLowerCase();
      return u ? state.url.includes(roleName) ? true : r.createUrlTree([roleName]) : r.parseUrl('/auth/sign-in');
    })
  );
};
