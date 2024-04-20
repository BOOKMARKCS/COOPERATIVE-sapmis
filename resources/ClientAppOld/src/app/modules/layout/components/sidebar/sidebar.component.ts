import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { RouterLink } from '@angular/router';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgClass, NgIf } from '@angular/common';
import {ThemeService} from "../../../../core/services/theme.service";
import {AuthService} from "../../../../core/services/auth.service";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    standalone: true,
    imports: [
        NgClass,
        NgIf,
        AngularSvgIconModule,
        SidebarMenuComponent,
        RouterLink,
    ],
})
export class SidebarComponent implements OnInit {

  constructor(public themeService: ThemeService, public menuService: MenuService, public authService:AuthService) {}

  ngOnInit(): void {
    console.log({menu:this.menuService.pagesMenu})
  }

  public toggleSidebar() {
    this.menuService.toggleSidebar();
  }
}
