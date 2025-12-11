import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {providePortfolio} from '../../../ngx-artist-portfolio/src/lib/provide-portfolio';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePortfolio({
      contentApiUrl: 'https://api.example.com/portfolio',
      siteTitle: 'My Art Portfolio'
    })
  ]
};
