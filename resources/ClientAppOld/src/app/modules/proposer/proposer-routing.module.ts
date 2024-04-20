import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProposerComponent} from "./proposer.component";
import {ProposalComponent} from "./proposal/proposal.component";
import {proposalResolver} from "./proposal/proposal.resolver";

const routes: Routes = [
  {path: '', component: ProposerComponent},
  {path: 'proposal', resolve: {master:proposalResolver}, component: ProposalComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProposerRoutingModule {
}
