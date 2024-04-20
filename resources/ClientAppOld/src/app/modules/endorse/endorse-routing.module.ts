import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EndorseComponent} from "./endorse.component";
import {UsersComponent} from "./users/users.component";
import {AddUserComponent} from "./users/add-user/add-user.component";

const routes: Routes = [
  {path: '', component: EndorseComponent},
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
export class EndorseRoutingModule {
}
