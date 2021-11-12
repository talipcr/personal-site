import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

const MODULES = [CommonModule, RouterModule, SharedModule, FlexLayoutModule];

@NgModule({
  declarations: [],
  exports: [...MODULES],
  imports: [...MODULES],
})
export class CoreModule {}
