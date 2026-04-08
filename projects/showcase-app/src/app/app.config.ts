import { ApplicationConfig } from '@angular/core';
import { providePortfolio } from '@ngx-artist-portfolio';

export const appConfig: ApplicationConfig = {
  providers: [
    providePortfolio({
      config: {
        contentApiUrl: 'assets/data',
        name: 'Artist Name',
        contact: {
          email: 'example@gmail.com',
          instagram: 'artistprofile'
        },
        cacheExpirationTimeMs: 60 * 60 * 1000, // 1 hour
        siteTitle: 'Showcase Portfolio App',
        // cloudinaryCloudName: 'your-cloud-name'
      },
      provideRouting: true // Library handles all routing
    })
  ]
};
