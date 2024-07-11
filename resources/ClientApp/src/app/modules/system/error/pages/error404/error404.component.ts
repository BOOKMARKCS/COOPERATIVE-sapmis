import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonComponent } from "../../../../../shared/components/button/button.component";
import { SvgIconComponent } from "../../../../../shared/components/svg-icon/svg-icon.component";

@Component({
  selector: 'app-error404',
  standalone: true,
  imports: [ButtonComponent, SvgIconComponent, RouterLink, RouterLinkActive],
  templateUrl: './error404.component.html',
  styleUrl: './error404.component.scss',
})
export class Error404Component {
  constructor(private router: Router) {
  }
}
