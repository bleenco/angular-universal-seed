import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone-node';
import 'rxjs';
import { ServerAppModule } from './app/server-app.module';
import { enableProdMode } from '@angular/core';
import { startServer } from './express';

enableProdMode();

startServer(ServerAppModule);
