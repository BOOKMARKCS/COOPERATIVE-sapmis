import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/system/layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/system/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'errors', data: {role: window.location.pathname},
    loadChildren: () => import('./modules/system/error/error.module').then((m) => m.ErrorModule),
  },
  {path: '**', redirectTo: 'errors/404'},

];
