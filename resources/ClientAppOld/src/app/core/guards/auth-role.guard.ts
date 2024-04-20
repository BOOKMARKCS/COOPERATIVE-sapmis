import {CanActivateFn, Router} from '@angular/router';
import {map} from "rxjs";
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";

export const authRoleGuard: CanActivateFn = (route, state) => {
  const r = inject(Router)
  return inject(AuthService).user$.pipe(
    map(u => {
      if (u) {
        const roleName = u.user.role.permission.toLowerCase();
        return state.url.includes(roleName) ? true : r.createUrlTree([roleName]);
      } else {
        console.log("User is not authenticated. Redirecting...");
        return r.parseUrl('/auth/sign-in');
      }
    })
  );
};
