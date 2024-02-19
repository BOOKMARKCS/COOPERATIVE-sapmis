import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-label',
  templateUrl: './text-label.component.html',
  styleUrls: ['./text-label.component.sass']
})
export class TextLabelComponent {
  @Input() label: string = '';
  @Input() text: string ='';

}
