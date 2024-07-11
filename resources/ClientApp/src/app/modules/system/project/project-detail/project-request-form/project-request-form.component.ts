import { Component, Input } from '@angular/core';
import { JsonPipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { FormArray } from "@angular/forms";

@Component({
  selector: 'app-project-request-form',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass,
    JsonPipe
  ],
  templateUrl: './project-request-form.component.html',
  styleUrl: './project-request-form.component.sass'
})
export class ProjectRequestFormComponent {
  @Input() data?: any;

  hasCommonElement(array1: string[] | undefined, array2: string[]): boolean {
    return array1?.some(item => array2.includes(String(item))) ?? false;
  }

  total() {
    const costAmounts = this.data?.projectDetail?.budget.costAmounts
    const remunerationAmounts = this.data?.projectDetail?.budget.remunerationAmounts
    const equipmentCostAmounts = this.data?.projectDetail?.budget.equipmentCostAmounts
    const other = this.data?.projectDetail?.budget.other


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

  protected readonly String = String;
}
