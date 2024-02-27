import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {AccountService} from "./presentation/features/account/account.service";
import {LoadingService} from "./core/base/components/loading/loading.service";
import {
  GuardsCheckEnd,
  NavigationCancel,
  NavigationEnd,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router
} from "@angular/router";
import {UpdateService} from "./core/update.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ClientApp';
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  role: string = '';

  constructor(protected accountService: AccountService, private ls: LoadingService, public update: UpdateService, private router: Router) {
    this.refreshUser()
    this.accountService.user$.subscribe(res => this.role = res?.user.role.name)
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next()
  }

  ngOnInit() {
    this.update.init();
    this.router.events.pipe(takeUntil(this.ngUnsubscribe)).subscribe((evt) => {
      if (evt instanceof RouteConfigLoadStart || evt instanceof GuardsCheckEnd) {
        this.ls.show();
      } else if (evt instanceof RouteConfigLoadEnd || evt instanceof NavigationEnd || evt instanceof NavigationCancel)
        this.ls.hide();
    });
  }

  refreshUser = () => this.accountService.refreshUser(this.accountService.getJWT()).subscribe({error: _ => this.accountService.logout()});
}
