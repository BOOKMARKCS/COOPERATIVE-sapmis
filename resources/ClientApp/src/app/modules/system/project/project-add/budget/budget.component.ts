import { Component } from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonComponent } from "../../../../../shared/components/button/button.component";
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [ButtonComponent, NgForOf, NgIf, NgOptimizedImage, ReactiveFormsModule, FormsModule],
  templateUrl: './budget.component.html',
})
export class BudgetComponent {
  addToggle: any;
  users: any
  newUser: any;

  add(value: string) {

  }

  setNewUser(value: string) {

  }

  protected readonly environment = environment;
  f: any
}
