import {Component, Input, OnInit} from '@angular/core';
import {InputComponent} from "../../../layout/components/inputs/input/input.component";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {SvgIconComponent} from "angular-svg-icon";
import {FormArray, FormBuilder} from "@angular/forms";
import {ResponsibleStudent} from "../../../../core/models/projectDetail/project-detail.model";

// @ts-ignore
@Component({
  selector: 'app-responsible-students',
  standalone: true,
  imports: [
    InputComponent,
    NgForOf,
    SvgIconComponent,
    JsonPipe,
    NgIf
  ],
  templateUrl: './responsible-students.component.html',
  styleUrl: './responsible-students.component.sass'
})
export class ResponsibleStudentsComponent {

  @Input() form: any
  indexOnly: number = 0

  constructor(private fb: FormBuilder) {
  }

  get formHasIndex() {
      return this.form.at(this.indexOnly);
  }

  add() {
    (this.form as FormArray).push(this.fb.group(new ResponsibleStudent()));
    this.indexOnly = this.form.length - 1;
  }

  remove(index: number) {
    if (this.form.length > 1) {
      (this.form as FormArray).removeAt(index);
      this.indexOnly = this.form.length - 1
    }
  }

}
