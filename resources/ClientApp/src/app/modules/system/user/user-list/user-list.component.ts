import {Component} from '@angular/core';
import {JsonPipe, NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {UserService} from "../user.service";
import { IOrganization } from "../../../../core/models/auth/user.model";
import {RouterLink} from "@angular/router";
import {environment} from "../../../../../environments/environment";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../../../core/services/auth.service";
import { SvgIconComponent } from "../../../../shared/components/svg-icon/svg-icon.component";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgForOf, NgIf, NgClass, NgOptimizedImage, RouterLink, ReactiveFormsModule, FormsModule, JsonPipe, SvgIconComponent],
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  users: any = {}
  organizations: IOrganization[] = []
  tap: string = ''
  auth : any

  constructor(usv: UserService,  auth : AuthService) {
    usv.get().subscribe(users => {
      this.users = users
      console.log({users})
    } );
    usv.organization().subscribe(o => this.organizations = o);
    auth.user$.subscribe(u => this.auth = u)
  }

  get getAllUser() {
    return Object.values(this.users).flatMap(users => users);
  }
  protected readonly environment = environment;
}
