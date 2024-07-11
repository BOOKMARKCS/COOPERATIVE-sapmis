import { Component } from '@angular/core';
import { HeaderComponent } from "../../../../system/layout/components/header/header.component";

@Component({
  selector: 'app-position',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './position.component.html',
  styleUrl: './position.component.sass'
})
export class PositionComponent {

}
