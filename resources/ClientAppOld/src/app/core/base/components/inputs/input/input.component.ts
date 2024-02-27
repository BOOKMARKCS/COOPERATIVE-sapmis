import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass']
})
export class InputComponent implements OnInit{
  @Input() label : string = ''
  @Input() inputFormControl: any;
  @Input() type : string = 'text';
  @Input() value : any = '';
  @Input() placeholder: string = '';
  @Input() min?:number = undefined;
  // @Input() disabled : boolean = false;

  ngOnInit(): void {
    if (!this.placeholder) this.placeholder = this.label
  }

}
