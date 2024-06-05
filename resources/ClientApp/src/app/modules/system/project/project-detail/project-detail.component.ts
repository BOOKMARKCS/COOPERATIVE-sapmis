import { Component } from '@angular/core';
import { HeaderComponent } from "../../layout/components/header/header.component";
import { JsonPipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { ProjectService } from "../project.service";
import { ActivatedRoute } from "@angular/router";
import { IProject } from "../../../../core/models/project/project.model";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { PaginatorModule } from "primeng/paginator";
import { SvgIconComponent } from "../../../../shared/components/svg-icon/svg-icon.component";
import { AlertService } from "../../../../shared/components/alert/alert.service";

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    HeaderComponent,
    NgForOf,
    JsonPipe,
    NgIf,
    ButtonComponent,
    PaginatorModule,
    SvgIconComponent,
    NgClass
  ],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.sass']
})
export class ProjectDetailComponent {
  projectData?: any;


  constructor(private psv: ProjectService, private route: ActivatedRoute, private asv: AlertService) {
    this.psv.show(this.route.snapshot.params['id']).subscribe(project => this.projectData = project);
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

  hasCommonElement(array1: string[] | undefined, array2: string[]): boolean {
    return array1?.some(item => array2.includes(String(item))) ?? false;
  }

  total() {
    const costAmounts = this.projectData?.projectDetail?.budget.costAmounts
    const remunerationAmounts = this.projectData?.projectDetail?.budget.remunerationAmounts
    const equipmentCostAmounts = this.projectData?.projectDetail?.budget.equipmentCostAmounts
    const other = this.projectData?.projectDetail?.budget.other


    // Check and prepare the data
    const toNumbers = (value: number | number[]): number => {
      if (Array.isArray(value) && value !== undefined) {
        return value.reduce((acc, cur) => acc + cur, 0);
      }
      return value || 0;
    };

    // Calculate totals
    const totalCostAmounts = toNumbers(costAmounts || []);
    const totalRemunerationAmounts = toNumbers(remunerationAmounts || []);
    const totalEquipmentCostAmounts = toNumbers(equipmentCostAmounts || []);
    const totalOther = toNumbers(other || 0);

    // Calculate grand total
    return totalCostAmounts + totalRemunerationAmounts + totalEquipmentCostAmounts + totalOther;
  }

  onSubmit(next: boolean) {
    if (next) {
      this.projectData.status  = this.psv.getProjectStatus(this.projectData!.projectType, this.projectData!.status)?.id;
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


}
