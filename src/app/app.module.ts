import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import en from '../assets/i18n/en.json';
import fr from '../assets/i18n/fr.json';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

const TRANSLATIONS: Record<string, object> = { en, fr };

// Translations are bundled: available synchronously on the first render
// (no empty-text frame after the prerendered page is replaced = no layout shift)
export class BundledTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<object> {
    return of(TRANSLATIONS[lang] ?? en);
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'personal-site' }),
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useClass: BundledTranslateLoader },
    }),
    AppRoutingModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
