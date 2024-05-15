import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResponsiveHelperComponent } from "./shared/components/responsive-helper/responsive-helper.component";
import { AuthService } from "./core/services/auth.service";
import { AlertService } from "./shared/components/alert/alert.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ResponsiveHelperComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'ClientApp';

  constructor(private authService: AuthService,  asv: AlertService, VCR: ViewContainerRef) {
    asv.setVCR(VCR)
  }

  ngOnInit(): void {
    this.refreshUser()
  }

  refreshUser = () => this.authService.refreshUser(this.authService.getJWT()).subscribe({
    next: u => u ? u : this.authService.logout(),
    error: _ => this.authService.logout()
  });
  viewDate: Date = new Date();
}
