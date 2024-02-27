import { Component } from '@angular/core';
import { AccountService } from "../../../../../presentation/features/account/account.service";
import {jwtDecode} from "jwt-decode";

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.sass']
})
export class NavMenuComponent {
    toggle: boolean = true;
    user: any;

    constructor(private accountService: AccountService) {
        accountService.user$.subscribe((user: any) => {
            this.user = user
            this.user.role = (jwtDecode(user?.jwt) as any).role
        })
    }

    logout = () => this.accountService.logout()

}
