import { Component } from '@angular/core';
import {
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loading: boolean = true;
  currentRoute: string = '';

  constructor(private router: Router) {
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
}
