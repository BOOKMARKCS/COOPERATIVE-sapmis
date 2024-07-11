import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from "./layout.component";
import { authRoleGuard, roleGuard } from "../../../core/guards/auth-role.guard";

const routes: Routes = [
  {
    path: '',
    canActivate: [authRoleGuard],
    component: LayoutComponent,
    children: [
      {
        path: 'advisor',
        data: {role: 'advisor'},
        loadChildren: () => import('../../features/advisor/advisor.module').then(m => m.AdvisorModule)
      },
      {
        path: 'affairs',
        data: {role: 'affairs'},
        loadChildren: () => import('../../features/affairs/affairs.module').then(m => m.AffairsModule),
      },
      {
        path: 'endorser',
        data: {role: 'endorser'},
        loadChildren: () => import('../../features/endorse/endorse.module').then(m => m.EndorseModule)
      }
      ,
      {
        path: 'responsible',
        canActivateChild: [roleGuard],
        data: {role: 'responsible'},
        loadChildren: () => import('../../features/responsible/responsible.module').then(m => m.ResponsibleModule)
      },
      {
        path: 'errors', data: {isWildcard: true},
        loadChildren: () => import('../../system/error/error.module').then((m) => m.ErrorModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {
}
