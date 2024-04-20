import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, Event} from '@angular/router';
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  private mainContent: HTMLElement | null = null;
   user: any;

  constructor(private router: Router,  authService: AuthService) {
    authService.user$.subscribe(u => this.user = u?.user)
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.mainContent) {
          this.mainContent!.scrollTop = 0;
        }
      }
    });
  }

  ngOnInit(): void {
    this.mainContent = document.getElementById('main-content');
  }
}
