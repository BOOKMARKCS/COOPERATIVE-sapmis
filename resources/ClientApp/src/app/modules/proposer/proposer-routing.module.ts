import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProposerComponent} from "./proposer.component";

const routes: Routes = [
  {path: '', component: ProposerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProposerRoutingModule { }
