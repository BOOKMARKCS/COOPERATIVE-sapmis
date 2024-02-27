import { AfterViewChecked, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHeightUpdater]'
})
export class HeightUpdaterDirective implements AfterViewChecked {

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngAfterViewChecked(): void {
    const elementB = this.el.nativeElement.querySelector('.height-updater');
    if (elementB) {
      const heightB = elementB.clientHeight;

      // เช็คขนาดของ div ก่อนที่จะปรับขนาด
      if (heightB > elementB.height) { // เปลี่ยน 200 เป็นขนาดที่คุณต้องการ
        this.renderer.setStyle(this.el.nativeElement, 'height', `${heightB}px`);
      }
    }
  }
}
