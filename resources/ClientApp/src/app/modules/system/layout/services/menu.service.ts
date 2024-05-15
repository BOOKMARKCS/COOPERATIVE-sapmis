import { Injectable, OnDestroy, signal } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AuthService } from "../../../../core/services/auth.service"
import { Menu } from "../../../../core/constants/menu"
import { MenuItem, SubMenuItem } from "../../../../core/models/menu.model"

@Injectable({providedIn: 'root'})
export class MenuService implements OnDestroy {
  private _showSidebar = signal(true)
  private _showMobileMenu = signal(false)
  private _pagesMenu = signal<MenuItem[]>([])
  private _subscription = new Subscription()

  constructor(private router: Router, authService: AuthService) {
    authService.user$.subscribe(u => u ? this._pagesMenu.set((Menu as any)[u.user.role.permission.toLocaleLowerCase()]) : 'proposer')
    let sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._pagesMenu().forEach((menu) => {
          let activeGroup = false
          menu.items.forEach((subMenu) => {
            const active = this.isActive(subMenu.route)
            subMenu.expanded = subMenu.active = active
            if (active) activeGroup = true
            if (subMenu.children) subMenu.expanded = subMenu.active = this.expand(subMenu.children)
          })
          menu.active = activeGroup
        })
      }
    })
    this._subscription.add(sub)
  }

  get showSideBar() { return this._showSidebar() }

  get showMobileMenu() { return this._showMobileMenu() }

  get pagesMenu() { return this._pagesMenu() }

  set showSideBar(value: boolean) { this._showSidebar.set(value) }

  set showMobileMenu(value: boolean) { this._showMobileMenu.set(value) }

  public toggleSidebar = () => this._showSidebar.set(!this._showSidebar())

  public toggleMenu(menu: any) {
    this.showSideBar = true
    menu.expanded = !menu.expanded
  }

  public toggleSubMenu = (submenu: SubMenuItem) => submenu.expanded = !submenu.expanded

  private expand(items: Array<any>) {
    let expand: boolean = false
    items.forEach((item) => {
      item.expanded = this.isActive(item.route) ? expand = true : false
      if (item.children) this.expand(item.children)
    })
    return expand
  }

  private isActive = (instruction: any): boolean => this.router.isActive(this.router.createUrlTree([instruction]), {
    paths: 'exact', queryParams: 'subset', fragment: 'ignored', matrixParams: 'ignored',
  })

  ngOnDestroy(): void { this._subscription.unsubscribe() }
}
