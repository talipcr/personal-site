import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HeroBackgroundComponent } from './components/hero-background/hero-background.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NeuralBackgroundComponent } from './components/neural-background/neural-background.component';
import { LoaderSpinnerComponent } from './components/loader-spinner/loader-spinner.component';
import { SummaryItemComponent } from './components/summary-item/summary-item.component';
import { FormatItemDirective } from './directives/format-item.directive';
import { MagneticDirective } from './directives/magnetic.directive';
import { FloatDirective } from './directives/float.directive';
import { RevealDirective } from './directives/reveal.directive';
import { TiltDirective } from './directives/tilt.directive';

const COMPONENTS = [
  HeaderComponent,
  HeroBackgroundComponent,
  FooterComponent,
  LayoutComponent,
  LoaderSpinnerComponent,
  NeuralBackgroundComponent,
  SummaryItemComponent,
];

const DIRECTIVES = [
  FormatItemDirective,
  RevealDirective,
  MagneticDirective,
  TiltDirective,
  FloatDirective,
];

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES],
  exports: [...COMPONENTS, ...DIRECTIVES, TranslateModule],
  imports: [RouterModule, CommonModule, FlexLayoutModule, TranslateModule],
})
export class SharedModule {}
