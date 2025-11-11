import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  constructor() {
    this.applyTheme();
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
    this.applyTheme();
  }

  private applyTheme() {
    document.body.classList.toggle('dark', this.darkMode);
  }
}
