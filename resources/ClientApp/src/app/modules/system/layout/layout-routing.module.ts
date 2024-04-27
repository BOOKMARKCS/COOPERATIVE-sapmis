import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./layout.component";
import {authRoleGuard} from "../../../core/guards/auth-role.guard";

const routes: Routes = [
  {
    path: '',
    canActivate: [authRoleGuard],
    component: LayoutComponent,
    children: [
      {
        path: 'advisor',
        loadChildren: () => import('../../features/advisor/advisor.module').then(m => m.AdvisorModule)
      },
      {
        path: 'affairs',
        loadChildren: () => import('../../features/affairs/affairs.module').then(m => m.AffairsModule)
      },
      {
        path: 'endorser',
        loadChildren: () => import('../../features/endorse/endorse.module').then(m => m.EndorseModule)
      },
      {
        path : 'proposer',
        loadChildren: () => import('../../features/proposer/proposer.module').then(m => m.ProposerModule)
      },
      {
        path : 'responsible',
        loadChildren: () => import('../../features/responsible/responsible.module').then(m => m.ResponsibleModule)
      }
    ]
  },
  {path: '**', redirectTo: 'error/404'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {
}
