import { Component } from '@angular/core';
import { HeaderComponent } from "../../../../system/layout/components/header/header.component";

@Component({
  selector: 'app-club',
  standalone: true,
    imports: [
        HeaderComponent
    ],
  templateUrl: './club.component.html',
  styleUrl: './club.component.sass'
})
export class ClubComponent {

}
