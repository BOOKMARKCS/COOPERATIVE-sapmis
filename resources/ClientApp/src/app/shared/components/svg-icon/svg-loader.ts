import { Observable, from } from 'rxjs'
import { Injectable } from '@angular/core'

@Injectable()
export class SvgLoader {
  getSvg = (url: string): Observable<string> => from(fetch(url).then(response => {
    if (response.ok) return response.text()
    else throw new Error(`Failed to load SVG from ${url}`)
  }))
}
