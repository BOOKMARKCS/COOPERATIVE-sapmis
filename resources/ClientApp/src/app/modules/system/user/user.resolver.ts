import { ResolveFn } from '@angular/router';
import { inject } from "@angular/core";
import { UserService } from "./user.service";
import { IGroupUser } from "../../../core/models/auth/user.model";

export const userListResolver: ResolveFn<IGroupUser> = (route, state) => inject(UserService).get()
