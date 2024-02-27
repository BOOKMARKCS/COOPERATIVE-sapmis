import {Inject, Injectable, signal} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public default = 'light';
  public themeChanged = signal(this.theme);
  localStorage: any

  constructor(@Inject(DOCUMENT) public document: Document) {
    this.localStorage = this.document.defaultView?.localStorage
  }

  public get theme() {
    return this.localStorage ? this.localStorage.getItem('theme') : this.default
  }

  public set theme(value: string) {
    localStorage.setItem('theme', value);
    this.themeChanged.set(value);
  }

  public get isDark(): boolean {
    return this.theme == 'dark';
  }
}
