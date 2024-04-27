import {Component, Input, OnInit} from '@angular/core';
import { MenuService } from '../services/menu.service';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobilecomponent';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { SvgIconComponent } from "../../../../shared/components/svg-icon/svg-icon.component";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    standalone: true,
  imports: [
    NavbarMenuComponent,
    ProfileMenuComponent,
    NavbarMobileComponent,
    SvgIconComponent,
  ],
})
export class NavbarComponent implements OnInit {
  @Input() user : any
  constructor(private menuService: MenuService) {}

  ngOnInit(): void {}

  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = true;
  }
}
