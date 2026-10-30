// No server.ts (static prerender only): load Zone.js for Node here
import 'zone.js/node';
import '@angular/platform-server/init';

import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export { AppServerModule } from './app/app.server.module';
export { renderModule } from '@angular/platform-server';
