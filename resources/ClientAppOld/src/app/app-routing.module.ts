import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authorizationGuard } from "./core/base/guards/authorization.guard";
import { NotFoundComponent } from "./core/base/components/errors/not-found/not-found.component";
import { roleGuard } from "./core/base/guards/roles.guard";

const routes: Routes = [
  { path: 'account', loadChildren: () => import('./presentation/features/account/account.module').then(m => m.AccountModule) },
  {
    path: '',
    canActivate: [authorizationGuard],
    canActivateChild: [roleGuard],
    children: [
      { path: 'affairs', data: {role: 'affairs'}, loadChildren: () => import('./presentation/features/affairs/affairs.module').then(m => m.AffairsModule) },
      { path: 'endorse', data: {role: 'endorse'}, loadChildren: () => import('./presentation/features/endorse/endorse.module').then(m => m.EndorseModule) },
      { path: 'approver', data:{role:'approver'},loadChildren: () => import('./presentation/features/approver/approver.module').then(m => m.ApproverModule) },
      { path: 'proposer', data:{role:'proposer'}, loadChildren: () => import('./presentation/features/project-proposer/project-proposer.module').then(m => m.ProjectProposerModule) },
      { path: 'responsible', data: {role: 'responsible'}, loadChildren: () => import('./presentation/features/responsible/responsible.module').then(m => m.ResponsibleModule) },
      { path: 'advisor', data:{role:'advisor'}, loadChildren: () => import('./presentation/features/advisor/advisor.module').then(m => m.AdvisorModule) },
      { path: 'general', data: {role:'general'}, loadChildren: () => import('./presentation/features/general/general.module').then(m => m.GeneralModule) }
    ]
  },
  {path: '**', component: NotFoundComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
