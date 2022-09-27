import { Injectable } from '@angular/core';

export type Theme = 'dark' | 'light';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private value: Theme = 'dark';

  constructor() {
    const theme: Theme = localStorage.getItem('theme') as Theme;
    if (theme) {
      this.value = theme;
    }
  }

  set theme(val: Theme) {
    localStorage.setItem('theme', val);
    this.value = val;
  }

  get theme(): Theme {
    return this.value;
  }
}
