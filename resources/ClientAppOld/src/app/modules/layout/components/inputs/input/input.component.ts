import {Component, Input, OnInit} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.sass'
})
export class InputComponent implements OnInit{
  @Input() label : string = ''
  @Input() inputFormControl: any;
  @Input() type : string = 'text';
  @Input() value : any = '';
  @Input() placeholder: string = '';
  @Input() min?:number = undefined;
  @Input() disabled : boolean = false;

  ngOnInit(): void {
    if (!this.placeholder) this.placeholder = this.label
    if (this.disabled) this.inputFormControl.disable()
  }
}
