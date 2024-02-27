import {Component} from '@angular/core';
import {MenuService} from "../../services/menu.service";
import {TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    TitleCasePipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent {
  constructor(public menuService: MenuService) {
  }
}
