import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from "../../../../../shared/components/button/button.component";
import { SvgIconComponent } from "../../../../../shared/components/svg-icon/svg-icon.component";

@Component({
  selector: 'app-error500',
  standalone: true,
  imports: [ButtonComponent, SvgIconComponent],
  templateUrl: './error500.component.html',
})
export class Error500Component {
  constructor(private router: Router) {
  }

  goToHomePage() {
    this.router.navigate(['/']);
  }
}
