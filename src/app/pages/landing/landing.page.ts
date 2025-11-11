// src/app/pages/landing/landing.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  isDarkMode = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      this.enableDark();
    } else {
      this.enableLight();
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.isDarkMode ? this.enableDark() : this.enableLight();
  }

  enableDark() {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
    localStorage.setItem('theme', 'dark');
    this.isDarkMode = true;
  }

  enableLight() {
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
    this.isDarkMode = false;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
