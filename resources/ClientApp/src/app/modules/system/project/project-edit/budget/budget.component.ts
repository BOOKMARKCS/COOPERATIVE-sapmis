import { Component, Input, OnInit } from '@angular/core';
import { JsonPipe, NgClass, NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { AbstractControl, FormArray, FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonComponent } from "../../../../../shared/components/button/button.component";
import { environment } from '../../../../../../environments/environment';
import { SvgIconComponent } from "../../../../../shared/components/svg-icon/svg-icon.component";

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [ButtonComponent, NgForOf, NgIf, NgOptimizedImage, ReactiveFormsModule, FormsModule, SvgIconComponent, NgClass, JsonPipe],
  templateUrl: './budget.component.html',
})
export class BudgetComponent implements OnInit {

  @Input() inputFormControl: any;
  sections: any = [
    {
      name: 'หมวดค่าใช้สอย',
      addButtonLabel: 'เพิ่มค่าใช้สอย',
      item: 'costDetails',
      amount: 'costAmounts'
    },
    {
      name: 'หมวดค่าตอบแทน',
      addButtonLabel: 'เพิ่มค่าตอบแทน',
      item: 'remunerationDetails',
      amount: 'remunerationAmounts'
    },
    {
      name: 'หมวดค่าวัสดุอุปกรณ์',
      addButtonLabel: 'เพิ่มค่าวัสดุอุปกรณ',
      item: 'equipmentCostDetails',
      amount: 'equipmentCostAmounts'
    },
  ];


  ngOnInit(): void { }

  users: any

  getFormArray = (formArrayName: string | string[]) => (this.inputFormControl.get(formArrayName) as FormArray);

  setFormControl = (formArray: AbstractControl) => (formArray as FormControl)

  getIndexArray = (controls: any) => Array.from({length: controls.length}, (_, i) => i);


  calculateTotal(): number {
    let total = 0;
    this.sections.forEach((section: any) => total += this.getFormArray(section.amount).value.reduce((sum: any, value: any) => sum + Number(value || 0), 0));
    total += Number(this.inputFormControl.get('other').value || 0);
    return total;
  }

  newFormControl = (s: string | number) => new FormControl(s)

  protected readonly environment = environment;
}
