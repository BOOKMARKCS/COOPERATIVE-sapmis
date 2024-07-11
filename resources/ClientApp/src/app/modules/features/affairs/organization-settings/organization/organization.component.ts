import { Component } from '@angular/core';
import { HeaderComponent } from "../../../../system/layout/components/header/header.component";
import { ProjectListComponent } from "../../../../system/project/project-list/project-list.component";
import { environment } from "../../../../../../environments/environment";
import { NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { SvgIconComponent } from "../../../../../shared/components/svg-icon/svg-icon.component";

@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [
    HeaderComponent,
    ProjectListComponent,
    NgForOf,
    NgIf,
    NgOptimizedImage,
    SvgIconComponent
  ],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.sass'
})
export class OrganizationComponent {

  protected readonly environment = environment;
}
