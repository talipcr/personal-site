import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoaderSpinnerComponent } from './components/loader-spinner/loader-spinner.component';
import { SummaryItemComponent } from './components/summary-item/summary-item.component';
import { FormatItemDirective } from './directives/format-item.directive';

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  LayoutComponent,
  LoaderSpinnerComponent,
  SummaryItemComponent,
];

const DIRECTIVES = [FormatItemDirective];

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES],
  exports: [...COMPONENTS, ...DIRECTIVES],
  imports: [RouterModule, CommonModule],
})
export class SharedModule {}
