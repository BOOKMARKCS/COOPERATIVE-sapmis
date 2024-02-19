import { Routes } from '@angular/router';
import { HomeComponent } from "./core/pages/home/home.component";

export const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import('./presentation/features/accounts/accounts.module').then(m => m.AccountsModule)
  },
  {path: '', loadChildren: () => import('./core/core.module').then(m => m.CoreModule)}
];
