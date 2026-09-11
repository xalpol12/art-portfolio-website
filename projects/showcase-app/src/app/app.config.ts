import { ApplicationConfig } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { providePortfolio, portfolioRoutes } from '@ngx-artist-portfolio';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import projectsData from '../assets/data/projects.json';
import thumbnailsData from '../assets/data/thumbnails.json';
import bioData from '../assets/data/bio.json';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(portfolioRoutes, withComponentInputBinding()),
    provideClientHydration(withEventReplay()),
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
        // baseUrl: 'https://<your-deployed-domain>', // set this to enable canonical/OG URLs and the sitemap
        labels: {
          nav: {projects: 'Galeria', bio: 'Bio', contact: 'Kontakt'},
          projectNav: {previous: 'Poprzedni', next: 'Następny'},
        },
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
