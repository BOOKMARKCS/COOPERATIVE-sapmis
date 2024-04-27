import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {AffairsService} from "../affairs/affairs.service";
import {AdvisorService} from "./advisor.service";
import {RouterLink} from "@angular/router";
import {ProjectService} from "../../system/project/project.service";
import {HeaderComponent} from "../../system/layout/components/header/header.component";
import { SvgIconComponent } from "../../../shared/components/svg-icon/svg-icon.component";

@Component({
  selector: 'app-advisor',
  standalone: true,
  imports: [
    HeaderComponent,
    NgForOf,
    NgIf,
    RouterLink,
    SvgIconComponent
  ],
  templateUrl: './advisor.component.html',
})
export class AdvisorComponent {
  projects:any

  constructor(psv: ProjectService) {
    psv.get().subscribe(p=> {
      this.projects = p;
      console.log({p})
    })
  }
}
