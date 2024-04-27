import { makeEnvironmentProviders, ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { SvgIconComponent } from "./svg-icon.component";
import { SVG_ICON_REGISTRY_PROVIDER, SvgIconRegistryService } from "./svg-icon-registry.service";
import { SvgHttpLoader, SvgLoader } from "./svg-loader";
import { CommonModule } from "@angular/common";

export interface AngularSvgIconConfig {
  loader?: Provider;
}

export function provideAngularSvgIcon(config: AngularSvgIconConfig = {}) {
  return makeEnvironmentProviders([
    SVG_ICON_REGISTRY_PROVIDER,
    config.loader || {provide: SvgLoader, useClass: SvgHttpLoader},
  ]);
}


@NgModule({
  imports: [CommonModule, SvgIconComponent],
  providers: [SvgIconRegistryService, SVG_ICON_REGISTRY_PROVIDER, {provide: SvgLoader, useClass: SvgHttpLoader}],
  exports: [SvgIconComponent]
})
export class SvgIconModule {
  static forRoot(config: AngularSvgIconConfig = {}): ModuleWithProviders<SvgIconModule> {
    return {
      ngModule: SvgIconComponent,
      providers: [
        SVG_ICON_REGISTRY_PROVIDER,
        config.loader || {provide: SvgLoader, useClass: SvgHttpLoader}
      ]
    };
  }
}
