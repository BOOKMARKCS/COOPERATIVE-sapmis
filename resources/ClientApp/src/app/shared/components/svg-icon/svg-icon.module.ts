import { NgModule } from '@angular/core'
import { SvgIconComponent } from "./svg-icon.component"
import { CommonModule } from "@angular/common"

@NgModule({
  imports: [CommonModule, SvgIconComponent],
  exports: [SvgIconComponent]
})
export class SvgIconModule { }
