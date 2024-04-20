import {Component} from '@angular/core';
import {HeaderComponent} from "../../layout/components/header/header.component";
import {JsonPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {AffairsUserTableComponent} from "../components/table-affairs-users/affairs-user-table.component";
import {AffairsService} from "../affairs.service";
import {RouterLinkActive} from "@angular/router";
import {IGroupUser, IOrganization, OrganizationType} from "../../../core/models/auth/user.model";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-users',
  standalone: true,
    imports: [HeaderComponent, NgIf, AffairsUserTableComponent, NgClass, RouterLinkActive, NgForOf, JsonPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.sass'
})
export class UsersComponent {
  users: IGroupUser = {}
  organizations: IOrganization[] = []
  tap: string = OrganizationType.Affairs;
  constructor(private sv: AffairsService) {
    this.sv.getUser().subscribe(u => Object.entries(u).forEach(([key, value]) => {
      Object(this.users)[key] = value
    }));
    this.sv.getOrganization().subscribe(o => this.organizations = o);
  }
}
