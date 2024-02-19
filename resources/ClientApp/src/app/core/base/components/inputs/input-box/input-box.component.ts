import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.sass']
})
export class InputBoxComponent {
  @Input() form :FormGroup =  this.fb.group({});
  @Input() inFormControlName :string = '';
  @Input() title : string = '';

    constructor(private fb:FormBuilder) { }
}
