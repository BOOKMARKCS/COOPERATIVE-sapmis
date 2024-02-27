import { Injectable, signal } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public default = 'light';
  public themeChanged = signal(this.theme);

  constructor() {}

  public get theme(): string {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('theme') ?? this.default;
    } else {
      // Fallback in case localStorage is not available
      return this.default;
    }
  }

  public set theme(value: string) {
    localStorage.setItem('theme', value);
    this.themeChanged.set(value);
  }

  public get isDark(): boolean {
    return this.theme == 'dark';
  }
}
