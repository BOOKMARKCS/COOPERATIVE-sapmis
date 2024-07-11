import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";
import { IUser } from "../models/auth/user.model";
import { AlertService } from "../../shared/components/alert/alert.service";

export const authRoleGuard: CanActivateFn = async (route, state) => {
  const r = inject(Router)
  let u: IUser = inject(AuthService).user()
  const roleName = u ? u.role.permission.toLowerCase() : '';
  if (route.firstChild?.data['isWildcard']) return true
  if (u) {
    if (roleName != route.firstChild?.data['role']) return r.createUrlTree([roleName]);
    return true;
  } else return r.parseUrl('/auth/sign-in')
}


export const roleGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const alertService = inject(AlertService);
  const authService = inject(AuthService);
  let user: IUser = authService.user();
  const roleName = user ? user.role.permission.toLowerCase() : '';
  if (route.firstChild?.data['isWildcard']) return true;
  return true;
  // if (user) {
  //   if (roleName !== route.firstChild?.data['role']) {
  //     alertService.error('การเปลี่ยนเส้นทางเกิดข้อผิดพลาด กรุณาลองอีกครั้ง');
  //     return router.createUrlTree([roleName]);
  //   }
  //   return true;
  // } else {
  //   alertService.error('คุณไม่ได้รับอนุญาตให้เข้าถึงหน้านี้');
  //   return router.parseUrl('/auth/sign-in');
  // }
};

