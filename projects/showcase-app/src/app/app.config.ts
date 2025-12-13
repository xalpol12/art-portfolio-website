import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {providePortfolio} from '../../../ngx-artist-portfolio/src/lib/provide-portfolio';

export const appConfig: ApplicationConfig = {
  providers: [
    providePortfolio({
      config: {
        contentApiUrl: 'https://api.example.com/portfolio',
        siteTitle: 'Showcase Portfolio App'
      },
      provideRouting: true // Library handles all routing
    })
  ]
};
