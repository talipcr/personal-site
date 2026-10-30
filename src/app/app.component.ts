import { DOCUMENT } from '@angular/common';
import { Component, Inject, NgZone } from '@angular/core';
import {
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  Router,
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { duration, enter, isBrowser } from './shared/motion/motion.tokens';

export const LANGUAGES = ['en', 'fr'];
export const LANGUAGE_STORAGE_KEY = 'lang';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // false at boot so the prerendered page is not replaced by the spinner
  loading: boolean = false;
  currentRoute: string = '';

  constructor(
    private router: Router,
    private translate: TranslateService,
    private zone: NgZone,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.translate.addLangs(LANGUAGES);
    this.translate.setDefaultLang('en');
    this.translate.onLangChange.subscribe((event) => {
      this.document.documentElement.lang = event.lang;
      if (isBrowser) localStorage.setItem(LANGUAGE_STORAGE_KEY, event.lang);
    });
    const savedLang = isBrowser ? localStorage.getItem(LANGUAGE_STORAGE_KEY) : null;
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(
      [savedLang, browserLang].find(
        (lang): lang is string => !!lang && LANGUAGES.includes(lang)
      ) ?? 'en'
    );

    this.router.events.subscribe(async (event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          // No spinner on the initial navigation (currentRoute still empty)
          this.loading = await !!this.currentRoute;
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
