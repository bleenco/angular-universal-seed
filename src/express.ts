import * as express from 'express';
import { platformServer, renderModuleFactory } from '@angular/platform-server';
import { universalExpressEngine } from './universal';
import { resolve } from 'path';
import { routes } from './app/app.module';

const serverRoutes = routes.map(route => `/${route.path}`);

export function startServer(module: any): void {
  const app = express();
  const port = 8000;

  app.engine('html', universalExpressEngine({
    ngModule: module
  }));

  app.set('view engine', 'html');
  app.set('views', resolve(__dirname, '../dist'));

  app.use('/', express.static(resolve(__dirname, '../dist'), { index: false }));

  serverRoutes.forEach(route => {
    app.get(route, (req: express.Request, res: express.Response) => {
      console.time(`GET: ${ req.originalUrl }`);
      res.render('index', { req: req, res: res });
      console.timeEnd(`GET: ${ req.originalUrl }`);
    });
  });

  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
}
