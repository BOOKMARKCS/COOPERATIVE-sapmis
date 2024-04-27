import { ResolveFn } from '@angular/router';
import {inject} from "@angular/core";
import {ProposerService} from "../proposer.service";

export const proposalResolver: ResolveFn<any> = (route, state) => inject(ProposerService).master()
