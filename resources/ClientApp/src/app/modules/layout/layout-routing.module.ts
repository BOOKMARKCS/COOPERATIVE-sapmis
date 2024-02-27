import {inject, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {authRoleGuard} from "../../core/guards/auth-role.guard";
import {NotFoundComponent} from "../../shared/components/pages/not-found/not-found.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: '',
    canActivate: [authRoleGuard],
    component: LayoutComponent,
    children: [
      {
        path: 'affairs',
        data: {role: 'affairs'},
        loadChildren: () => import('../affairs/affairs.module').then(m => m.AffairsModule)
      },
      {
        path: 'endorse',
        data: {role: 'endorse'},
        loadChildren: () => import('../endorse/endorse.module').then(m => m.EndorseModule)
      },

      {
        path: 'proposer',
        data: {role: 'proposer'},
        loadChildren: () => import('../proposer/proposer.module').then(m => m.ProposerModule)
      },
    ]
  },
  // {path: '', redirectTo: authRoleGuard, pathMatch: 'full'},
  // {
  //   path: 'error',
  //   // component: LayoutComponent,
  //   children: [
  //     {path: '404', component: NotFoundComponent}
  //   ]
  // },
  // {path: '**', redirectTo: 'error/404'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {
}
