import {Component} from '@angular/core';
import {HeaderComponent} from "../layout/components/header/header.component";
import {EndorseService} from "./endorse.service";

@Component({
  selector: 'app-endorse',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './endorse.component.html',
  styleUrl: './endorse.component.sass'
})
export class EndorseComponent {


}
