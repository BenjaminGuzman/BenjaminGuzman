import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit {
  /**
   * Indicates light or dark mode
   * It is a class for the icon shown in the nav
   */
  public nextMode: mode = 'dark_mode';

  constructor() { }

  ngOnInit(): void {
    this.toggleDarkMode();
  }

  toggleDarkMode(): void {
    if (this.nextMode === 'dark_mode') {
      localStorage.theme = 'dark';
      this.nextMode = 'light_mode';
    } else {
      localStorage.theme = 'light';
      this.nextMode = 'dark_mode';
    }

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))
      document.documentElement.classList.add('dark');
    else
      document.documentElement.classList.remove('dark');
  }
}

type mode = 'light_mode' | 'dark_mode';
