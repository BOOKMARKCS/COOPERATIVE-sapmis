import { Component } from '@angular/core';
import { AccountService } from "../../../../../presentation/features/account/account.service";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-nav-bottom',
  templateUrl: './nav-bottom.component.html',
  styleUrls: ['./nav-bottom.component.sass']
})
export class NavBottomComponent {
  isExpanded: boolean = false;
  user: any;

  constructor(private accountService: AccountService) {
    accountService.user$.subscribe((user: any) => {
      if (user) {
        this.user = user
        this.user.role = (jwtDecode(user.jwt) as any).role
      }
    })
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.accountService.logout()
  }
}
