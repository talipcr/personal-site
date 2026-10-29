import { Component, NgZone } from '@angular/core';
import {
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  Router,
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { duration, enter } from './shared/motion/motion.tokens';

export const LANGUAGES = ['en', 'fr'];
export const LANGUAGE_STORAGE_KEY = 'lang';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loading: boolean = true;
  currentRoute: string = '';

  constructor(
    private router: Router,
    private translate: TranslateService,
    private zone: NgZone
  ) {
    this.translate.addLangs(LANGUAGES);
    this.translate.setDefaultLang('en');
    this.translate.onLangChange.subscribe((event) => {
      document.documentElement.lang = event.lang;
      localStorage.setItem(LANGUAGE_STORAGE_KEY, event.lang);
    });
    const savedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(
      [savedLang, browserLang].find(
        (lang): lang is string => !!lang && LANGUAGES.includes(lang)
      ) ?? 'en'
    );

    this.router.events.subscribe(async (event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = await true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = await false;
          this.currentRoute = this.router.url;
          break;
        }

        default: {
          break;
        }
      }
    });
  }

  /** Route enter transition: fade + slight translateY, kept under 0.4s. */
  public animatePage(page: HTMLElement): void {
    this.zone.runOutsideAngular(() =>
      enter(page, { opacity: [0, 1], y: [12, 0] }, { duration: duration.base })
    );
  }
}
