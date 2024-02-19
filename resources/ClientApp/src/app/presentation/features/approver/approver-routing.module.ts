import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproverComponent } from "./approver.component";

const routes: Routes = [
  {path:'',component:ApproverComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApproverRoutingModule { }
