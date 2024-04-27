import { Component } from '@angular/core';
import { JsonPipe, NgIf, TitleCasePipe } from "@angular/common";
import { MenuService } from "../../services/menu.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TitleCasePipe, NgIf, JsonPipe],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  menu: any
  children: any

  constructor(public menuService: MenuService, public route: Router) {
    this.menuService.pagesMenu[0].items.map((item: any) => {
      let localRoute = this.route.url.split('/')
      const routeOne = localRoute.pop()
      const routeTwo = localRoute.pop()
      if (item.route?.split('/').pop() === routeOne || item.route?.split('/').pop() === routeTwo) {
        this.menu = item
        item.children?.forEach((value: any) => {
          if (value.route.split('/').pop() === routeOne) this.children = value.route.split('/').pop()
        })
      }
    })
  }
}
