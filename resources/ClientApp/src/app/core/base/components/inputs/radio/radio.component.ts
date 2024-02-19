import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.sass']
})
export class RadioComponent {
  @Input() name: string = '';
  @Input() id : string = '';
  @Input() inputFormControl: any;
  @Input() checked: boolean = false; // Input to control checked state
  @Output() selectionChanged = new EventEmitter<string>(); // Output event
  @Input() disable: boolean = false;

}
