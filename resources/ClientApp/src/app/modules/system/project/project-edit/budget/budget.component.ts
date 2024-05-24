import { Component, Input, OnInit } from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonComponent } from "../../../../../shared/components/button/button.component";
import { environment } from '../../../../../../environments/environment';
import { SvgIconComponent } from "../../../../../shared/components/svg-icon/svg-icon.component";

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [ButtonComponent, NgForOf, NgIf, NgOptimizedImage, ReactiveFormsModule, FormsModule, SvgIconComponent],
  templateUrl: './budget.component.html',
})
export class BudgetComponent implements OnInit {

  @Input() inputFormControl: any;
  addToggle: any;

  ngOnInit(): void {
    console.log({BudgetInput: this.inputFormControl.value})
  }

  users: any

  getFormArray = (formArrayName: string | string[]) => (this.inputFormControl.get(formArrayName) as FormArray);

  getIndexArray = (controls: any) => Array.from({length: controls.length}, (_, i) => i);


  add(value: string) {

    console.log({inputFormControl: this.inputFormControl.value})
  }

  addBudgetItems() {

  }


  protected readonly environment = environment;

  newFormControl = (s: string | number) => new FormControl(s)
}
