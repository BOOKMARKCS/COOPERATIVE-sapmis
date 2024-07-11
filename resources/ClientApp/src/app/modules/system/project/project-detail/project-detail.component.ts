import { Component } from '@angular/core';
import { HeaderComponent } from "../../layout/components/header/header.component";
import { JsonPipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { ProjectService } from "../project.service";
import { ActivatedRoute } from "@angular/router";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { PaginatorModule } from "primeng/paginator";
import { SvgIconComponent } from "../../../../shared/components/svg-icon/svg-icon.component";
import { AlertService } from "../../../../shared/components/alert/alert.service";
import { ProjectRequestFormComponent } from "./project-request-form/project-request-form.component";
import { DeliveryNoteComponent } from "./delivery-note/delivery-note.component";
import { ProjectStatus } from "../../../../core/models/project/project.enum";

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [HeaderComponent, NgForOf, JsonPipe, NgIf, ButtonComponent, PaginatorModule, SvgIconComponent, NgClass, ProjectRequestFormComponent, DeliveryNoteComponent],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.sass']
})
export class ProjectDetailComponent {
  projectData?: any;


  constructor(private psv: ProjectService, public route: ActivatedRoute, private asv: AlertService) {
    this.psv.show(this.route.snapshot.params['id']).subscribe({
      next: p => {
        this.projectData = p
        console.log({p})
      }, error: () => {
        window.location.href = '/'
      }
    });
  }


  printSection() {
    const printContents = document.getElementById('print-section')?.innerHTML;
    const originalContents = document.body.innerHTML;

    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  }

  onSubmit(next: boolean) {
    if (next) {
      this.projectData.status = this.psv.getProjectStatus(this.projectData!.projectType, this.projectData!.status)?.id;
    } else {
      this.projectData.preStatus = this.projectData.status
      this.projectData.status = 1000
    }

    console.log({projectData: this.projectData, next})
    this.psv.update(this.projectData, this.route.snapshot.params['id']).subscribe({
      next: () => {
        this.asv.success('บันทึกข้อมูลสำเร็จ')
        window.location.href = '/'
      }, error: () => this.asv.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
    })
  }

  protected readonly String = String;
  protected readonly ProjectStatus = ProjectStatus;

  back() {
    window.location.href = '/'
  }
}
