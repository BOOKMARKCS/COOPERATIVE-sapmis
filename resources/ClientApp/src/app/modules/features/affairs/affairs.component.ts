import { Component } from '@angular/core';
import { JsonPipe, NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { RouterLink } from "@angular/router";
import { HeaderComponent } from "../../system/layout/components/header/header.component";
import { ProjectComponent } from "../../system/project/project.component";
import { ProjectListComponent } from "../../system/project/project-list/project-list.component";

@Component({
  selector: 'app-affairs',
  standalone: true,
  imports: [ HeaderComponent, NgIf, NgForOf, NgOptimizedImage, RouterLink, JsonPipe, ProjectComponent, ProjectListComponent ],
  templateUrl: './affairs.component.html',
})
export class AffairsComponent {
}
