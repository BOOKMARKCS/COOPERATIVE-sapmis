import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {ButtonComponent} from "../../../../../shared/components/button/button.component";
import { SvgIconComponent } from "../../../../../shared/components/svg-icon/svg-icon.component";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  standalone: true,
  imports: [FormsModule, RouterLink, ButtonComponent, SvgIconComponent],
})
export class SignUpComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
