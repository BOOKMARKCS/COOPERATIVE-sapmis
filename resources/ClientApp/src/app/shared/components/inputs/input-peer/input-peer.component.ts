import {Component, Input, OnInit} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-input-peer',
  standalone: true,
  imports: [ ReactiveFormsModule, NgClass ],
  templateUrl: './input-peer.component.html',
})
export class InputPeerComponent implements OnInit{
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
  }}
