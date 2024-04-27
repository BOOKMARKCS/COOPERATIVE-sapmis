import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { AlertComponent } from './alert.component';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private _vcr!: ViewContainerRef;

  constructor() {}

  setVCR(vcr: ViewContainerRef): void {
    this._vcr = vcr;
  }

  into = (message: string, duration: number = 5000): void => this.createAlert(message, 'info', duration);

  success = (message: string, duration: number = 5000): void => this.createAlert(message, 'success', duration);

  error = (message: string, duration: number = 5000): void => this.createAlert(message, 'error', duration);

  warn = (message: string, duration: number = 5000): void => this.createAlert(message, 'warn', duration);

  private createAlert(message: string, type: string, duration: number): void {
    const compRef = this._vcr.createComponent(AlertComponent);
    compRef.instance.message = message;
    compRef.instance.type = type;
    compRef.changeDetectorRef.detectChanges();

    setTimeout(() => this.fadeOutAlert(compRef), duration - 1000);
  }

  private fadeOutAlert(compRef: ComponentRef<AlertComponent>): void {
    let opacity = 1;
    const timer = setInterval(() => {
      opacity -= 0.1;
      compRef.location.nativeElement.style.opacity = opacity.toString();
      if (opacity <= 0) {
        clearInterval(timer);
        compRef.destroy();
      }
    }, 50);
  }
}
