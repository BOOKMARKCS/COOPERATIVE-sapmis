import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet, Event} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, RouterOutlet],
})
export class LayoutComponent implements OnInit {
  private mainContent: HTMLElement | null = null;
  user: any;

  constructor(authService: AuthService, private router: Router) {
    authService.user$.subscribe(u => this.user = u?.user)
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) if (this.mainContent) this.mainContent!.scrollTop = 0;
    });
  }

  ngOnInit(): void {
    this.mainContent = document.getElementById('main-content');
  }
}
