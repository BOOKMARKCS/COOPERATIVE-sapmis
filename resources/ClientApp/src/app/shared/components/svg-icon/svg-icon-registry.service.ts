import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core'
import { Observable, of, throwError } from 'rxjs'
import { catchError, finalize, map, share, tap } from 'rxjs/operators'
import { DOCUMENT } from '@angular/common'
import { SvgLoader } from "./svg-loader"

@Injectable()
export class SvgIconRegistryService {
  private iconsByUrl = new Map<string, SVGElement>()
  private iconsLoadingByUrl = new Map<string, Observable<SVGElement>>()

  constructor(private loader: SvgLoader, @Inject(PLATFORM_ID) protected platformId: Object, @Optional() @Inject(DOCUMENT) private document: any) {
  }

  loadSvg = (url: string, name: string = url): Observable<SVGElement | undefined> | undefined => this.iconsByUrl.get(name) ? of(this.iconsByUrl.get(name)) : this.iconsLoadingByUrl.get(name) || (this.iconsLoadingByUrl.set(name, this.loader.getSvg(url).pipe(
      map(svg => {
        const div = this.document.createElement('div')
        div.innerHTML = svg
        return div.querySelector('svg') as SVGElement
      }),
      tap(svg => this.iconsByUrl.set(name, svg)),
      catchError(err => throwError(() => new Error(err))),
      finalize(() => this.iconsLoadingByUrl.delete(name)),
      share()
    )) && this.iconsLoadingByUrl.get(name)
  )

  getSvgByName = (name: string): Observable<SVGElement | undefined> | undefined => this.iconsByUrl.has(name) ? of(this.iconsByUrl.get(name)) : this.iconsLoadingByUrl.has(name) ? this.iconsLoadingByUrl.get(name) : throwError(() => new Error(`No svg with name '${name}' has been loaded`))
}
