import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'products-gallery';

  ngOnInit() {
    const saved = localStorage.getItem('theme');
    const isDark = saved === 'dark';
    this.setTheme(isDark);
  }

  onThemeToggle(isDark: boolean) {
    this.setTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  setTheme(isDark: boolean) {
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
  }

}
