import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [BlogComponent],
  imports: [BlogRoutingModule, CoreModule],
})
export class BlogModule {}
