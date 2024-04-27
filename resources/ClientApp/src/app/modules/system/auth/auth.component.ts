import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SvgIconComponent } from "../../../shared/components/svg-icon/svg-icon.component";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  standalone: true,
  imports: [RouterOutlet, SvgIconComponent],
})
export class AuthComponent {
  constructor() {
  }
}
