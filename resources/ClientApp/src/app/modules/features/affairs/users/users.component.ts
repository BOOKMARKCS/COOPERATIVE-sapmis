import { Component } from '@angular/core';
import { JsonPipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { ActivatedRoute, RouterLinkActive } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from "../../../system/layout/components/header/header.component";
import { UserListComponent, UserListMode } from "../../../system/user/user-list/user-list.component";
import { IGroupUser, IUser } from "../../../../core/models/auth/user.model";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [HeaderComponent, NgIf, NgClass, RouterLinkActive, NgForOf, JsonPipe, FormsModule, ReactiveFormsModule, UserListComponent],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  users :any
  constructor(route: ActivatedRoute) {
    this.users = route.snapshot.data['list']
    console.log({user2:this.users})
  }
}
