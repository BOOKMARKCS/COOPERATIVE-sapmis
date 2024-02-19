import { CanActivateFn } from '@angular/router';
import { AccountService } from "../../../presentation/features/account/account.service";
import { map } from "rxjs/operators";
import { inject } from "@angular/core";
export const roleGuard: CanActivateFn = (route) => inject(AccountService).user$.pipe(map(u => u.user.role.name === route.data['role']));
