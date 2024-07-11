import { Component, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResponsiveHelperComponent } from "./shared/components/responsive-helper/responsive-helper.component";
import { AlertService } from "./shared/components/alert/alert.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ResponsiveHelperComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(asv: AlertService, VCR: ViewContainerRef) {
    asv.setVCR(VCR)
  }


}
