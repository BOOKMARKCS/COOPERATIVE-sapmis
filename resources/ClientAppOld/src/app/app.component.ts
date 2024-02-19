import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  GuardsCheckEnd, NavigationCancel,
  NavigationEnd,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
  RouterOutlet
} from '@angular/router';
import { NavbarComponent } from "./core/components/navbar/navbar.component";
import { SidebarComponent } from "./core/components/sidebar/sidebar.component";
import { LoadingComponent } from "./core/pages/loading/loading.component";
import { Subject, takeUntil } from "rxjs";
import { LoadingService } from "./core/pages/loading/loading.service";
import { AccountsService } from "./presentation/features/accounts/accounts.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { CoreModule } from "./core/core.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, NavbarComponent, SidebarComponent, LoadingComponent],
  // imports: [HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ClientApp';

  protected ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private accountService: AccountsService, private ls: LoadingService, private router: Router) {
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next()
  }

  ngOnInit(): void {
    // if (localStorage.getItem('ClientAppUser')) {
      this.router.navigate(['account/login']);
    // }
    // this.refreshUser();
    // this.router.events.pipe(takeUntil(this.ngUnsubscribe)).subscribe((evt) => {
    //   if (evt instanceof RouteConfigLoadStart || evt instanceof GuardsCheckEnd) {
    //     this.ls.show();
    //   } else if (evt instanceof RouteConfigLoadEnd || evt instanceof NavigationEnd || evt instanceof NavigationCancel) {
    //     this.ls.hide();
    //   }
    // });
  }

  private refreshUser() {
    // const jwt = this.accountService.getJWT();
    // if (jwt) {
      // this.accountService.refreshUser(jwt).subscribe({
      //   next: _ => {
      //   },
      //   error: error => {
      //     this.accountService.logout();
      //   }
      // })
    // } else this.accountService.refreshUser(null).subscribe();
  }
}
