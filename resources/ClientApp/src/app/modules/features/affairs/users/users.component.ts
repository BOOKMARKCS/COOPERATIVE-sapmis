import {Component} from '@angular/core';
import {JsonPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {RouterLinkActive} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from "../../../system/layout/components/header/header.component";
import {UserListComponent} from "../../../system/user/user-list/user-list.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [HeaderComponent, NgIf, NgClass, RouterLinkActive, NgForOf, JsonPipe, FormsModule, ReactiveFormsModule, UserListComponent],
  templateUrl: './users.component.html',
})
export class UsersComponent {
}
