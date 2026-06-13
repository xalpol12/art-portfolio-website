import { ApplicationConfig } from '@angular/core';
import { providePortfolio, portfolioRoutes } from '@ngx-artist-portfolio';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import projectsData from '../assets/data/projects.json';
import thumbnailsData from '../assets/data/thumbnails.json';
import bioData from '../assets/data/bio.json';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(portfolioRoutes, withComponentInputBinding()),
    providePortfolio({
      config: {
        name: 'Zuzanna Bandosz',
        contact: {
          email: 'zuzia.bandosz@gmail.com',
          instagram: 'zbandosz'
        },
        siteTitle: 'Zuzanna Bandosz',
        disableLightboxZoom: true,
        cloudinaryCloudName: 'drtnqrawh',
        data: {
          projects: projectsData as any,
          thumbnails: thumbnailsData as any,
          bio: bioData as any
        }
      },
      provideRouting: false
    })
  ]
};
