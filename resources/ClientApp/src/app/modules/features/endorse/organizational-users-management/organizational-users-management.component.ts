import { Component } from '@angular/core';
import {HeaderComponent} from "../../../system/layout/components/header/header.component";
import {UserAddComponent} from "../../../system/user/user-add/user-add.component";
import {UserListComponent} from "../../../system/user/user-list/user-list.component";

@Component({
  selector: 'app-organizational-user-management',
  standalone: true,
  imports: [HeaderComponent, UserAddComponent, UserListComponent],
  templateUrl: './organizational-users-management.component.html',
})
export class OrganizationalUsersManagementComponent {

}
