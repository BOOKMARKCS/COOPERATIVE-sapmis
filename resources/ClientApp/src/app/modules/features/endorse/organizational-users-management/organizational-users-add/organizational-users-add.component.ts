import { Component } from '@angular/core';
import {HeaderComponent} from "../../../../system/layout/components/header/header.component";
import {UserAddComponent} from "../../../../system/user/user-add/user-add.component";

@Component({
  selector: 'app-organizational-users-add',
  standalone: true,
    imports: [ HeaderComponent, UserAddComponent ],
  templateUrl: './organizational-users-add.component.html',
})
export class OrganizationalUsersAddComponent {

}
