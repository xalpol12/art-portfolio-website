import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, RenderMode, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import projectsData from '../assets/data/projects.json';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(
      withRoutes([
        { path: '', renderMode: RenderMode.Prerender },
        { path: 'projects', renderMode: RenderMode.Prerender },
        {
          path: 'projects/:id',
          renderMode: RenderMode.Prerender,
          async getPrerenderParams() {
            return (projectsData as any[]).map((p: any) => ({ id: p.id }));
          },
        },
        { path: 'bio', renderMode: RenderMode.Prerender },
        { path: 'contact', renderMode: RenderMode.Prerender },
        { path: '**', renderMode: RenderMode.Client },
      ])
    ),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
