import { ApplicationConfig } from '@angular/core';
import { providePortfolio } from '@ngx-artist-portfolio';

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
