import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { NavbarMobileMenuComponent } from './navbar-mobile-menu/navbar-mobile-menu.component';
import { NgClass } from '@angular/common';
import { SvgIconComponent } from "../../../../../shared/components/svg-icon/svg-icon.component";

@Component({
    selector: 'app-navbar-mobile',
    templateUrl: './navbar-mobile.component.html',
    standalone: true,
  imports: [
    NgClass,
    NavbarMobileMenuComponent,
    SvgIconComponent,
  ],
})
export class NavbarMobileComponent implements OnInit {
  constructor(public menuService: MenuService) {}

  ngOnInit(): void {}

  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = false;
  }
}
