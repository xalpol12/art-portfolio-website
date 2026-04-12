import { ApplicationConfig } from '@angular/core';
import { providePortfolio } from '@ngx-artist-portfolio';

export const appConfig: ApplicationConfig = {
  providers: [
    providePortfolio({
      config: {
        contentApiUrl: 'assets/data',
        name: 'Zuzanna Bandosz',
        contact: {
          email: 'zuzia.bandosz@gmail.com',
          instagram: 'zbandosz'
        },
        cacheExpirationTimeMs: 1,
        siteTitle: 'Zuzanna Bandosz',
        disableLightboxZoom: true,
        cloudinaryCloudName: 'drtnqrawh'
      },
      provideRouting: true // Library handles all routing
    })
  ]
};
