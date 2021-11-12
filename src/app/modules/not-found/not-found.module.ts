import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [NotFoundRoutingModule, CoreModule],
})
export class NotFoundModule {}
