import { Component, Input } from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonComponent } from "../../../../../shared/components/button/button.component";
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [ButtonComponent, NgForOf, NgIf, NgOptimizedImage, ReactiveFormsModule, FormsModule],
  templateUrl: './budget.component.html',
})
export class BudgetComponent {
  @Input() inputFormControl!: FormGroup;
  addToggle: any;
  users: any

  add(value: string) {

    console.log({inputFormControl:this.inputFormControl.value})
  }

  addBudgetItems(){

  }


  protected readonly environment = environment;
  f: any
}
