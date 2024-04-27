import {Component} from '@angular/core';

import {NgForOf, TitleCasePipe} from "@angular/common";
import {ButtonComponent} from "../../../../shared/components/button/button.component";
import {HeaderComponent} from "../../../system/layout/components/header/header.component";

@Component({
  selector: 'app-project-approval',
  standalone: true,
  imports: [HeaderComponent, TitleCasePipe, NgForOf, ButtonComponent],
  templateUrl: './project-approval.component.html',
})
export class ProjectApprovalComponent {

}
