import {Routes} from '@angular/router';
import {HomePageComponent} from './features/home-page.component';
import {BioPageComponent} from './features/bio-page.component';
import {ProjectComponent} from './features/projects/project.component';
import {ProjectsPageComponent} from './features/projects/projects-page.component';
import {ContactPageComponent} from './features/contact-page.component';
import {NotFoundPageComponent} from './features/not-found-page.component';
import {PortfolioRoutesConfig} from './portfolio.config';

/**
 * Builds the library's routes, optionally renaming the default `projects`/`bio`/`contact`
 * segments via `PortfolioConfig.routes`. Used internally by `providePortfolio()`; call it
 * directly if you need the route list without going through `providePortfolio`.
 */
export function buildPortfolioRoutes(routes?: PortfolioRoutesConfig): Routes {
  const projects = routes?.projects ?? 'projects';
  const projectDetail = routes?.projectDetail ?? projects;
  const bio = routes?.bio ?? 'bio';
  const contact = routes?.contact ?? 'contact';

  return [
    {path: '', component: HomePageComponent},
    {path: projects, component: ProjectsPageComponent},
    {path: `${projectDetail}/:id`, component: ProjectComponent},
    {path: bio, component: BioPageComponent},
    {path: contact, component: ContactPageComponent},
    {path: '**', component: NotFoundPageComponent},
  ];
}

/** Default routes (no segment renaming). Prefer `buildPortfolioRoutes()` if you use `PortfolioConfig.routes`. */
export const portfolioRoutes: Routes = buildPortfolioRoutes();
