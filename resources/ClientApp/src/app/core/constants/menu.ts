import {MenuItem} from '../models/menu.model';

export class Menu {
  public static affairs: MenuItem[] = [{
    group: 'เมนู',
    separator: false,
    items: [
      {
        icon: 'assets/icons/heroicons/outline/chart-pie.svg',
        label: 'หน้าหลัก',
        route: '/affairs',
      },
      {
        icon: 'assets/icons/heroicons/outline/users.svg',
        label: 'จัดการผู้ใช้',
        route: '/affairs/users',
        children: [ {label: 'รายชื่อผู้ใช้', route: '/affairs/users'}, {label: 'เพิ่มผู้ใช้', route: '/affairs/users/add'} ],
      },
    ],
  }]
  public static proposer: MenuItem[] = [{
    group: 'เมนู',
    separator: false,
    items: [
      {
        icon: 'assets/icons/heroicons/outline/chart-pie.svg',
        label: 'หน้าหลัก',
        route: '/proposer',
      },
      {
        icon: 'assets/icons/heroicons/outline/document.svg',
        label: 'เสนอโครงการ',
        route: '/proposer/proposal',
      },
    ],
  }]
  public static responsible: MenuItem[] = [{
    group: 'เมนู',
    separator: false,
    items: [
      {
        icon: 'assets/icons/heroicons/outline/chart-pie.svg',
        label: 'หน้าหลัก',
        route: '/responsible',
      },
      {
        icon: 'assets/icons/heroicons/outline/chart-pie.svg',
        label: 'รายละเอียดโปรเจ็ค',
        route: '/responsible/project-detail',
      },
    ],
  }]
  public static endorser: MenuItem[] = [{
    group: 'เมนู',
    separator: false,
    items: [
      {
        icon: 'assets/icons/heroicons/outline/chart-pie.svg',
        label: 'หน้าหลัก',
        route: '/endorser',
      },
      {
        icon: 'assets/icons/heroicons/outline/users.svg',
        label: 'จัดการผู้ใช้',
        route: '/endorser/users',
        children: [ {label: 'รายชื่อผู้ใช้', route: '/endorser/users/list'}, {label: 'เพิ่มผู้ใช้', route: '/endorser/users/add'} ],
      },
      {
        icon: 'assets/icons/heroicons/outline/document.svg',
        label: 'โครงการ',
        route: '/endorser/projects',
        children: [ {label: 'โครงการทั้งหมด', route: '/endorser/projects/list'}, {label: 'เพิ่มโครงการ', route: '/endorser/projects/add'} ]
      },
    ]
  }]
  public static advisor: MenuItem[] = [{
    group: 'เมนู',
    separator: false,
    items: [
      {
        icon: 'assets/icons/heroicons/outline/chart-pie.svg',
        label: 'หน้าหลัก',
        route: '/advisor',
      },
      {
        icon: 'assets/icons/heroicons/outline/document.svg',
        label: 'โครงการทั้งหมด',
        route: '/advisor/project',
      },
    ],
  }]
}
