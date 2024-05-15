import { ChangeDetectorRef, Component, DoCheck, ElementRef, Input, KeyValueChangeRecord, KeyValueChanges, KeyValueDiffer, KeyValueDiffers, OnDestroy, OnInit, Renderer2 } from '@angular/core'
import { Subscription } from 'rxjs'
import { SvgIconRegistryService } from './svg-icon-registry.service'
import { CommonModule } from '@angular/common'
import { SvgLoader } from "./svg-loader"

@Component({
  selector: 'svg-icon',
  standalone: true,
  imports: [CommonModule],
  providers: [SvgIconRegistryService, SvgLoader],
  template: '<ng-content></ng-content>'
})
export class SvgIconComponent implements OnInit, OnDestroy, DoCheck {
  @Input() src!: string
  @Input() name?: string
  @Input() stretch = false
  @Input() applyClass = false
  @Input() svgClass?: any
  @Input('class') klass?: any
  @Input() viewBox?: string

  @Input() set svgStyle(values: { [klass: string]: any } | null) {
    this._svgStyle = values
    if (!this.helper.differ && values) this.helper.differ = this.differs.find(values).create()
  }

  private helper = {svg: undefined as SVGElement | undefined, icnSub: new Subscription(), differ: undefined as KeyValueDiffer<string, string | number> | undefined, loaded: false}
  private _svgStyle: { [key: string]: any } | null = null

  constructor(private element: ElementRef, private differs: KeyValueDiffers, private renderer: Renderer2, private iconReg: SvgIconRegistryService, private cdr: ChangeDetectorRef) { }

  ngOnInit() { this.init() }

  ngOnDestroy() { this.helper.icnSub.unsubscribe() }

  ngDoCheck() {
    if (this.helper.svg && this.helper.differ) {
      const changes = this.helper.differ.diff(this._svgStyle!)
      if (changes) this.applyChanges(changes)
    }
  }

  private init() {
    const svgObs = this.name ? this.iconReg.getSvgByName(this.name) : (this.src ? this.iconReg.loadSvg(this.src) : null)
    if (svgObs) this.helper.icnSub = svgObs.subscribe(svg => svg ? this.initSvg(svg) : this.clearSvg())
    else this.clearSvg()
  }

  private clearSvg() {
    this.renderer.setProperty(this.element.nativeElement, 'innerHTML', '')
    this.cdr.markForCheck()
  }

  private initSvg(svg: SVGElement | undefined): void {
    if (!this.helper.loaded && svg) {
      this.setSvg(svg)
      this.resetDiffer()
    }
  }

  private resetDiffer() { if (this._svgStyle && !this.helper.differ) this.helper.differ = this.differs.find(this._svgStyle).create() }

  private setSvg(svg: SVGElement) {
    if (this.helper.loaded || !svg) return
    const icon = svg.cloneNode(true) as SVGElement
    const elem = this.element.nativeElement
    this.renderer.setProperty(elem, 'innerHTML', '')
    this.renderer.appendChild(elem, icon)
    this.helper.loaded = true
    if (this.klass && this.applyClass) this.setClass(elem.firstChild, null, this.klass)
    if (this.svgClass) this.setClass(elem.firstChild, null, this.svgClass)
    this.renderer.removeAttribute(icon, 'width')
    this.renderer.removeAttribute(icon, 'height')
    if (this.viewBox) {
      const w = icon.getAttribute('width')
      const h = icon.getAttribute('height')
      if (this.viewBox === 'auto' && h && w) {
        const vb = `0 0 ${w} ${h}`
        this.renderer.setAttribute(icon, 'viewBox', vb)
      } else if (this.viewBox !== '') this.renderer.setAttribute(icon, 'viewBox', this.viewBox)
    }
    this.stylize()
    this.cdr.markForCheck()
  }

  private stylize() {
    if (this.helper.svg) {
      const svg = this.element.nativeElement.firstChild
      if (this.stretch) this.renderer.setAttribute(svg, 'preserveAspectRatio', 'none')
      else if (!this.stretch) this.renderer.removeAttribute(svg, 'preserveAspectRatio')
    }
  }

  private applyChanges(changes: KeyValueChanges<string, string | number>) {
    changes.forEachRemovedItem((record: KeyValueChangeRecord<string, string | number>) => this.setStyle(record.key, null))
    changes.forEachAddedItem((record: KeyValueChangeRecord<string, string | number>) => this.setStyle(record.key, record.currentValue))
    changes.forEachChangedItem((record: KeyValueChangeRecord<string, string | number>) => this.setStyle(record.key, record.currentValue))
  }

  private setStyle(nameAndUnit: string, value: string | number | null | undefined) {
    const [name, unit] = nameAndUnit.split('.')
    value = value !== null && unit ? `${value}${unit}` : value
    const svg = this.element.nativeElement.firstChild
    if (value !== null) this.renderer.setStyle(svg, name, value as string)
    else this.renderer.removeStyle(svg, name)
  }

  private setClass(target: HTMLElement | SVGSVGElement, previous: string | string[] | null, current: string | string[] | null) {
    if (target) {
      if (previous) {
        const klasses = (Array.isArray(previous) ? previous : previous.split(' ')).filter((klass) => klass)
        for (const k of klasses) this.renderer.removeClass(target, k)
      }
      if (current) {
        const klasses = (Array.isArray(current) ? current : current.split(' ')).filter((klass) => klass)
        for (const k of klasses) this.renderer.addClass(target, k)
      }
    }
  }
}
