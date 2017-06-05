import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone-node';
import 'rxjs';
import { ServerAppModuleNgFactory } from './ngfactory/app/server-app.module.ngfactory';
import { enableProdMode } from '@angular/core';
import { startServer } from './express';

enableProdMode();

startServer(ServerAppModuleNgFactory);
