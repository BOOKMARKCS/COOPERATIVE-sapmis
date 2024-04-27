import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {ButtonComponent} from "../../../../../shared/components/button/button.component";

@Component({
  selector: 'app-two-steps',
  templateUrl: './two-steps.component.html',
  standalone: true,
  imports: [FormsModule, RouterLink, ButtonComponent],
})
export class TwoStepsComponent implements OnInit {
  constructor() {}
  public inputs = Array(6);

  ngOnInit(): void {}
}
