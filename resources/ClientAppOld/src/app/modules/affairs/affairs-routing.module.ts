import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AffairsComponent} from "./affairs.component";
import {NotFoundComponent} from "../../shared/components/pages/not-found/not-found.component";
import {AddUserComponent} from "./users/add-user/add-user.component";
import {UsersComponent} from "./users/users.component";

const routes: Routes = [
  {path: '', component: AffairsComponent},
  {
    path: 'users',
    children: [
      {path: '', component: UsersComponent},
      {path: 'add', component: AddUserComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AffairsRoutingModule {
}
