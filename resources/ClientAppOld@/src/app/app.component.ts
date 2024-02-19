import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  GuardsCheckEnd, NavigationCancel,
  NavigationEnd,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
  RouterOutlet
} from '@angular/router';
import { CoreModule } from "./core/core.module";
import { HttpClient } from "@angular/common/http";
import { HttpService } from "./core/http/http.service";
import { Subject, takeUntil } from "rxjs";
import { AccountService } from "./presentation/features/account/account.service";
import { LoadingService } from "./core/base/components/loading/loading.service";
import { UpdateService } from "./core/update.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ClientApp';
  protected ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private accountService: AccountService, private ls: LoadingService, private update: UpdateService, private router: Router) {
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next()
  }

  ngOnInit(): void {
    this.refreshUser();
    this.update.init();
    this.router.events.pipe(takeUntil(this.ngUnsubscribe)).subscribe((evt) => {
      if (evt instanceof RouteConfigLoadStart || evt instanceof GuardsCheckEnd) {
        this.ls.show();
      } else if (evt instanceof RouteConfigLoadEnd || evt instanceof NavigationEnd || evt instanceof NavigationCancel) {
        this.ls.hide();
      }
    });
  }

  private refreshUser() {
    const jwt = this.accountService.getJWT();
    if (jwt) {
      this.accountService.refreshUser(jwt).subscribe({
        next: _ => {
        },
        error: error => {
          this.accountService.logout();
          if (error.status === 401) console.log(false, 'Account blocked', error.error);
        }
      })
    } else this.accountService.refreshUser(null).subscribe();
  }
}
