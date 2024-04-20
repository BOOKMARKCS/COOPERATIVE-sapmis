import {Component} from '@angular/core';
import {HeaderComponent} from "../layout/components/header/header.component";
import {TableComponent} from "../../shared/components/table/table.component";
import {AffairsUserTableComponent} from "./components/table-affairs-users/affairs-user-table.component";
import {AffairsService} from "./affairs.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-affairs',
  standalone: true,
  imports: [
    HeaderComponent,
    TableComponent,
    AffairsUserTableComponent,
    NgIf,
  ],
  templateUrl: './affairs.component.html',
  styleUrl: './affairs.component.sass'
})
export class AffairsComponent {
  users: any

  constructor(private sv: AffairsService) {
    this.sv.getUser().subscribe(u => this.users = u)
  }

}
