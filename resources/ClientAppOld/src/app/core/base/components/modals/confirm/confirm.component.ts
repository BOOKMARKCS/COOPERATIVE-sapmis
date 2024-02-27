import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.sass']
})
export class ConfirmComponent {
    @Output() confirmed  = new EventEmitter<any>();
    // @Output() confirmed  = false
    @Output() closed = new EventEmitter<boolean>();
    itemName: string = '';
    label: string = 'ส่งกลับข้อมูล'

    showModal = false
  confirm(){
      this.confirmed.emit(true)
    // this.confirmed = true
  }
    close() {
        this.closed.emit();
    };
}
