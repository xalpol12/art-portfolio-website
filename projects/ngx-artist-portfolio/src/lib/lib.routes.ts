import {Routes} from '@angular/router';
import {HomePageComponent} from './features/home-page.component';
import {PortfolioRoutesConfig} from './portfolio.config';

/**
 * Builds the library's routes, optionally renaming the default `projects`/`bio`/`contact`
 * segments via `PortfolioConfig.routes`. Used internally by `providePortfolio()`; call it
 * directly if you need the route list without going through `providePortfolio`.
 *
 * Every route but home is lazy (`loadComponent`) so a visitor's initial JS payload doesn't
 * include the lightbox/video/gallery/bio/contact code until they actually navigate there —
 * this matters most on slower mobile CPUs/connections.
 */
export function buildPortfolioRoutes(routes?: PortfolioRoutesConfig): Routes {
  const projects = routes?.projects ?? 'projects';
  const projectDetail = routes?.projectDetail ?? projects;
  const bio = routes?.bio ?? 'bio';
  const contact = routes?.contact ?? 'contact';

  return [
    {path: '', component: HomePageComponent},
    {
      path: projects,
      loadComponent: () => import('./features/projects/projects-page.component').then(m => m.ProjectsPageComponent),
    },
    {
      path: `${projectDetail}/:id`,
      loadComponent: () => import('./features/projects/project.component').then(m => m.ProjectComponent),
    },
    {
      path: bio,
      loadComponent: () => import('./features/bio-page.component').then(m => m.BioPageComponent),
    },
    {
      path: contact,
      loadComponent: () => import('./features/contact-page.component').then(m => m.ContactPageComponent),
    },
    {
      path: '**',
      loadComponent: () => import('./features/not-found-page.component').then(m => m.NotFoundPageComponent),
    },
  ];
}

/** Default routes (no segment renaming). Prefer `buildPortfolioRoutes()` if you use `PortfolioConfig.routes`. */
export const portfolioRoutes: Routes = buildPortfolioRoutes();
