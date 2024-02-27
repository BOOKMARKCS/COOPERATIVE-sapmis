import {Component, Input} from '@angular/core';
import {ThemeService} from "../../../services/theme.service";
import {MenuService} from "../../../services/menu.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.sass'
})
export class SidebarComponent {
  public appJson: any ;

  constructor(public themeService: ThemeService, public menuService: MenuService) {}

  ngOnInit(): void {}

  public toggleSidebar() {
    this.menuService.toggleSidebar();
  }

  toggleTheme() {
    this.themeService.theme = !this.themeService.isDark ? 'dark' : 'light';
  }
  // @Input() role: string = ''
  //
  // constructor(public location: Location) {
  // }
  //
  // getMenu() {
  //   const obj : any = {
  //     'affairs': [
  //       {path: '/affairs', label: 'หน้าหลัก'},
  //       {path: '/affairs/user-management', label: 'จัดการผู้ใช้'},
  //     ],
  //     'endorse': [
  //       {path: '/endorse', label: 'หน้าหลัก'}
  //     ],
  //     'approver': [
  //       {path: '/approver', label: 'หน้าหลัก'}
  //     ],
  //     'proposer': [
  //       {path: '/proposer', label: 'หน้าหลัก'}
  //     ],
  //     'responsible': [
  //       {path: '/responsible', label: 'หน้าหลัก'}
  //     ],
  //     'advisor': [
  //       {path: '/advisor', label: 'หน้าหลัก'}
  //     ],
  //     'general': [
  //       {path: '/general', label: 'หน้าหลัก'}
  //     ]
  //   }
  // return obj[this.role]
  // }


}
