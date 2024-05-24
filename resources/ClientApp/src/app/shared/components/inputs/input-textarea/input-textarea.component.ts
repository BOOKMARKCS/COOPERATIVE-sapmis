import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-input-textarea',
  standalone: true,
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './input-textarea.component.html',
  styleUrl: './input-textarea.component.sass'
})
export class InputTextareaComponent implements OnInit{
  @Input() label : string = ''
  @Input() inputFormControl: any;
  @Input() value : any = '';
  @Input() placeholder: string = '';
  @Input() min?:number = undefined;
  @Input() disabled : boolean = false;

  ngOnInit(): void {
    if (!this.placeholder) this.placeholder = this.label
    if (this.disabled) this.inputFormControl.disable()
  }
}
