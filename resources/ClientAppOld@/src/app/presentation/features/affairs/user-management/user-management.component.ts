import { Component, OnInit } from '@angular/core';
import { UserManagementService } from "./user-management.service";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.sass'
})
export class UserManagementComponent {
  users: any;

  constructor(private ums: UserManagementService) {
    this.ums.getUsers().subscribe({next: (u) => this.users = u})
  }
}
