import { Component } from '@angular/core';
import {HeaderComponent} from "../../layout/components/header/header.component";
import {TableComponent} from "../../../shared/components/table/table.component";
import {EndorseService} from "../endorse.service";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    HeaderComponent,
    TableComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.sass'
})
export class UsersComponent {
  user:any
  constructor(sv: EndorseService) {
    sv.getUser().subscribe(u => this.user = u)
  }
}
