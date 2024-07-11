import { Component, Input, OnInit } from '@angular/core';
import { JsonPipe, NgClass, NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { UserService } from "../user.service";
import { IGroupUser, IOrganization, IUser } from "../../../../core/models/auth/user.model";
import { RouterLink } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../../../core/services/auth.service";
import { SvgIconComponent } from "../../../../shared/components/svg-icon/svg-icon.component";

export enum UserListMode {
  ReadOnly = 'readonly',
  Affairs = 'affairs'
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgForOf, NgIf, NgClass, NgOptimizedImage, RouterLink, ReactiveFormsModule, FormsModule, JsonPipe, SvgIconComponent],
  templateUrl: './user-list.component.html',
})

export class UserListComponent implements OnInit {
  @Input() data: any = {}
  users: any = {};
  filteredUsers: any[] = [];
  organizations: IOrganization[] = []
  organizationColors = ['#64748b', '#f43f5e', '#71717a', '#d946ef', '#ef4444', '#8b5cf6', '#22c55e', '#06b6d4'];
  tap: string = ''
  searchTerm: string = '';
  auth: any
  @Input({transform: (value: 'ReadOnly' | 'Affairs') => UserListMode[value]}) mode: UserListMode = UserListMode.ReadOnly;
  dropdownToggle: boolean[] = [false];

  constructor(private usv: UserService, authService: AuthService) {
    this.usv.organization().subscribe(o => this.organizations = o);
    this.auth = authService.user()
  }

  ngOnInit(): void {
    if (this.data) this.users = this.data
    else this.usv.get().subscribe(users => this.users = users);
  }

  loadUsers() {
    this.usv.get(this.searchTerm).subscribe(users => {
      this.users = users;
      this.filteredUsers = this.getAllUser;
    });
  }


  get getAllUser() {
    return Object.values(this.users).flatMap(users => users);
  }

  searchUsers() {
    this.loadUsers();
  }

  protected readonly environment = environment;
}
