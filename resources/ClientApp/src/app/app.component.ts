import {Component, OnInit } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ResponsiveHelperComponent} from "./shared/components/responsive-helper/responsive-helper.component";
import {ThemeService} from "./core/services/theme.service";
import {AuthService} from "./core/services/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ResponsiveHelperComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'ClientApp';
  constructor(private authService: AuthService, themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.refreshUser()
  }

  refreshUser = () => this.authService.refreshUser(this.authService.getJWT()).subscribe({
    next: u => u ? u : this.authService.logout(),
    error: _ => this.authService.logout()
  });
}
