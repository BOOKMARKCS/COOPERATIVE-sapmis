import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-in-label',
  templateUrl: './input-in-label.component.html',
  styleUrls: ['./input-in-label.component.sass']
})
export class InputInLabelComponent implements OnInit{
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() inputFormControl : any;
  @Input() class: string = '';

  ngOnInit(): void {
    this.placeholder = this.label
  }

}
