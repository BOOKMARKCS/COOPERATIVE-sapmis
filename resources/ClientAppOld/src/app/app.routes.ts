import {Routes} from '@angular/router';
import {NotFoundComponent} from "./shared/components/pages/not-found/not-found.component";
import {authRoleGuard} from "./core/guards/auth-role.guard";

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  // {
  //   path: 'error',
  //   children: [
  //     {path: '404', component: NotFoundComponent}
  //   ]
  // },
  {path: '**', redirectTo: '/error/404'},
];
