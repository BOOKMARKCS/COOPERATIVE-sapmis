import { Component } from '@angular/core';
import {HeaderComponent} from "../layout/components/header/header.component";
import {ProposerService} from "./proposer.service";

@Component({
  selector: 'app-proposer',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './proposer.component.html',
  styleUrl: './proposer.component.sass'
})
export class ProposerComponent {

  constructor(private proposerService:ProposerService) {
  }
}
