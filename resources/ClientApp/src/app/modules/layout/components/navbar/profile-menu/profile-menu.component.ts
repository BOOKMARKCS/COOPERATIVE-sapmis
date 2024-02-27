import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { ClickOutsideDirective } from '../../../../../shared/directives/click-outside.directive';
import {AuthService} from "../../../../../core/services/auth.service";

@Component({
    selector: 'app-profile-menu',
    templateUrl: './profile-menu.component.html',
    styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent implements OnInit {
  public isMenuOpen = false;

  constructor(private authService : AuthService) {}

  ngOnInit(): void {}

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  signOut = () => this.authService.logout()
}
