import { Component, inject } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.sass'
})
export class SidebarComponent {

  constructor(public location: Location,    route : Router) {
    console.log({route});
  }

  getMenu() {
    const menu = [
      {
        'affairs': [
          {path: '/affairs', label: 'หน้าหลัก'},
          {path: '/affairs/user-management', label: 'จัดการผู้ใช้'},
        ],
        'endorse': [
          {path: '/endorse', label: 'หน้าหลัก'}
        ],
        'approver': [
          {path: '/approver', label: 'หน้าหลัก'}
        ],
        'proposer': [
          {path: '/proposer', label: 'หน้าหลัก'}
        ],
        'responsible': [
          {path: '/responsible', label: 'หน้าหลัก'}
        ],
        'advisor': [
          {path: '/advisor', label: 'หน้าหลัก'}
        ],
        'general': [
          {path: '/general', label: 'หน้าหลัก'}
        ]
      }
    ]
    return menu
  }


}
