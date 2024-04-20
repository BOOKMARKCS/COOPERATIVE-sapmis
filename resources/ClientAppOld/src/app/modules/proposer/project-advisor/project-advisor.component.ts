import {Component, Input} from '@angular/core';
import {InputComponent} from "../../layout/components/inputs/input/input.component";
import {NgForOf} from "@angular/common";
import {SvgIconComponent} from "angular-svg-icon";
import {FormArray, FormBuilder} from "@angular/forms";
import {ProjectAdvisor, ResponsibleStudent} from "../../../core/models/projectDetail/project-detail.model";

@Component({
  selector: 'app-project-advisor',
  standalone: true,
  imports: [
    InputComponent,
    NgForOf,
    SvgIconComponent
  ],
  templateUrl: './project-advisor.component.html',
  styleUrl: './project-advisor.component.sass'
})
export class ProjectAdvisorComponent {
  @Input() form: any
  indexOnly: number = 0

  constructor(private fb: FormBuilder) {
  }

  get formHasIndex() {
    return this.form.at(this.indexOnly);
  }

  add() {
    (this.form as FormArray).push(this.fb.group(new ProjectAdvisor()));
    this.indexOnly = this.form.length - 1;
  }

  remove(index: number) {
    if (this.form.length > 1) {
      (this.form as FormArray).removeAt(index);
      this.indexOnly = this.form.length - 1
    }
  }
}
