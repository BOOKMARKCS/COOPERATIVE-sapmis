import {MenuItem} from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Base',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Dashboard',
          route: 'dashboard',
          children: [
            {label: 'Nfts', route: '/dashboard/nfts'},
            {label: 'Podcast', route: '/dashboard/podcast'},
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/lock-closed.svg',
          label: 'Auth',
          route: '/auth',
          children: [
            {label: 'Sign up', route: 'auth/sign-up'},
            {label: 'Sign in', route: 'auth/sign-in'},
            {label: 'Forgot Password', route: 'auth/forgot-password'},
            {label: 'New Password', route: 'auth/new-password'},
            {label: 'Two Steps', route: 'auth/two-steps'},
          ],
        },
      ],
    },
    {
      group: 'Collaboration',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/download.svg',
          label: 'Download',
          route: 'download',
        },
        {
          icon: 'assets/icons/heroicons/outline/gift.svg',
          label: 'Gift Card',
          route: 'gift',
        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Users',
          route: 'users',
        },
      ],
    },
    {
      group: 'Config',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Settings',
          route: 'settings',
        },
        {
          icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Notifications',
          route: 'gift',
        },
        {
          icon: 'assets/icons/heroicons/outline/folder.svg',
          label: 'Folders',
          route: 'folders',
          children: [
            {label: 'Current Files', route: 'folders/current-files'},
            {label: 'Downloads', route: 'folders/download'},
            {label: 'Trash', route: 'folders/trash'},
          ],
        },
      ],
    },
  ];
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
        children: [
          {label: 'รายชื่อผู้ใช้', route: '/affairs/users'},
          {label: 'เพิ่มผู้ใช้', route: '/affairs/users/add'}
        ],
      },
    ],
  }]

  public static endorse: MenuItem[] = [{
    group: 'เมนู',
    separator: false,
    items:[
      {
        icon: 'assets/icons/heroicons/outline/chart-pie.svg',
        label: 'หน้าหลัก',
        route: '/endorse'
      },
      {
        icon: 'assets/icons/heroicons/outline/users.svg',
        label: 'จัดการผู้ใช้',
        route: '/endorse/users',
        // children: [
        //   {label: 'รายชื่อผู้ใช้', route: '/endorse/users'},
        //   {label: 'เพิ่มผู้ใช้', route: '/endorse/users/add'},
        // ],
      },
    ],
  }]

  public static proposer: MenuItem[] = [{
    group: 'เมนู',
    separator: false,
    items:[
      {
        icon: 'assets/icons/heroicons/outline/chart-pie.svg',
        label: 'หน้าหลัก',
        route: '/proposer'
      },
      {
        icon: 'assets/icons/heroicons/outline/document.svg',
        label: 'เสนอโครงการ',
        route: '/proposer/proposal',
        // children: [
        //   {label: 'รายชื่อผู้ใช้', route: '/endorse/users'},
        //   {label: 'เพิ่มผู้ใช้', route: '/endorse/users/add'},
        // ],
      },
    ],
  }]
}
