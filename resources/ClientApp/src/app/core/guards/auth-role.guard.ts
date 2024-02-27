import {CanActivateFn, Router} from '@angular/router';
import {map} from "rxjs";
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";
import {DOCUMENT} from "@angular/common";

export const authRoleGuard: CanActivateFn = (route, state) => {
  const {doc, r} = {doc: inject(DOCUMENT), r: inject(Router)}
  return inject(AuthService).user$.pipe(
    map(u => {
      const roleName = u.user.role?.name;
      if (!u && roleName !== route.routeConfig?.children?.['0'].data?.['role']) {
        doc.location.href = 'account/login';
        return false;
      }
      return state.url.includes(roleName) ?  true :  r.createUrlTree([roleName])
    })
  );
};
