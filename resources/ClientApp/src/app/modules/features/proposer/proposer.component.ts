import { Component } from '@angular/core';
import { JsonPipe, NgForOf, NgIf } from "@angular/common";
import { ProjectService } from "../../system/project/project.service";
import { HeaderComponent } from "../../system/layout/components/header/header.component";
import { SvgIconComponent } from "../../../shared/components/svg-icon/svg-icon.component";

@Component({
  selector: 'app-proposer',
  standalone: true,
  imports: [HeaderComponent, NgForOf, NgIf, JsonPipe, SvgIconComponent],
  templateUrl: './proposer.component.html',
})
export class ProposerComponent {
  projects: any;

  constructor(private ps: ProjectService) {
    this.ps.get().subscribe(p => this.projects = p)
  }
}
