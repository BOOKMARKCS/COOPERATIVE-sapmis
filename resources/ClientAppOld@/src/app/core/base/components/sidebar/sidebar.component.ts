import {  Component } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.sass'
})
export class SidebarComponent  {
  constructor(public location: Location) {
  }
}
