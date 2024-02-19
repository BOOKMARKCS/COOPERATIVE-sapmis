import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import('./presentation/features/account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'affairs',
    loadChildren: () => import('./presentation/features/affairs/affairs.module').then(m => m.AffairsModule)
  },
  {
    path: 'project-proposer',
    loadChildren: () => import('./presentation/features/project-proposer/project-proposer.module').then(m => m.ProjectProposerModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
