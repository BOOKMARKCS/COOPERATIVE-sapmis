import { Component } from '@angular/core';
import {HeaderComponent} from "../../../../system/layout/components/header/header.component";
import {UserAddComponent} from "../../../../system/user/user-add/user-add.component";
import {UserListComponent} from "../../../../system/user/user-list/user-list.component";

@Component({
  selector: 'app-organizational-users-list',
  standalone: true,
  imports: [ HeaderComponent, UserAddComponent, UserListComponent ],
  templateUrl: './organizational-users-list.component.html',
})
export class OrganizationalUsersListComponent {

}
