import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.sass']
})
export class CommentBoxComponent implements OnInit{
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<any> = new EventEmitter();
  @Input() inputFormControl: any;
  showModal: boolean =  false;
  email: string = '';

  ngOnInit(): void {
    console.log({inputFormControl:this.inputFormControl.value})
  }

}
