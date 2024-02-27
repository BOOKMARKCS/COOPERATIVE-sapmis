import { Component } from '@angular/core';
import {HeaderComponent} from "../../layout/components/header/header.component";
import {NgIf} from "@angular/common";
import {AffairsUserTableComponent} from "../components/table-affairs-users/affairs-user-table.component";
import {AffairsService} from "../affairs.service";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    HeaderComponent,
    NgIf,
    AffairsUserTableComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.sass'
})
export class UsersComponent {
  users : any
  constructor(private sv : AffairsService) {
    this.sv.getUser().subscribe(u => {
      this.users = u
      console.log({u})
      console.log(this.users)
    })
  }
}
