import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ThemeService} from "./core/services/theme.service";
import {NgClass} from "@angular/common";
import {ResponsiveHelperComponent} from "./shared/components/responsive-helper/responsive-helper.component";
import {AuthService} from "./core/services/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgClass, ResponsiveHelperComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent implements OnInit {
  title = 'ClientApp';


  constructor(private authService: AuthService, themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.refreshUser()
  }

  refreshUser = () => this.authService.refreshUser(this.authService.getJWT()).subscribe({
    next: u => u ?? this.authService,
    error: _ => this.authService.logout()
  });
}
