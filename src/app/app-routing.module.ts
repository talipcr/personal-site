import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/homepage/homepage.module').then(
        (m) => m.HomepageModule
      ),
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('./modules/blog/blog.module').then((m) => m.BlogModule),
  },

  {
    path: '404',
    loadChildren: () =>
      import('./modules/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
