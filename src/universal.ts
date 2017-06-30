import * as fs from 'fs';
import { renderModuleFactory } from '@angular/platform-server';

const templateCache: { [key: string]: string } = {};
const outputCache: { [key: string]: string } = {};

export function universalExpressEngine(setupOptions: any) {
  return function(filePath: string, options: { req: Request }, callback: (err: Error, html: string) => void) {
    let url: string = options.req.url;
    let html: string = outputCache[url];

    if (html) {
      callback(null, html);
    } else {
      if (!templateCache[filePath]) {
        templateCache[filePath] = fs.readFileSync(filePath).toString();
      }

      let appModuleFactory = setupOptions.ngModule;

      renderModuleFactory(appModuleFactory, {
        document: templateCache[filePath],
        url: url
      }).then(str => {
        outputCache[url] = str;
        callback(null, str);
      });
    }
  }
}
