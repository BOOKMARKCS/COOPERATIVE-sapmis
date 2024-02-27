import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EndorseComponent} from "./endorse.component";

const routes: Routes = [
  {path: '', component: EndorseComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EndorseRoutingModule {
}
