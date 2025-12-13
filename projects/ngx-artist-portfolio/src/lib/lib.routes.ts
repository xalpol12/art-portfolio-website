import {Routes} from '@angular/router';
import {HomePageComponent} from './features/home-page.component';
import {BioPageComponent} from './features/bio-page.component';
import {ProjectPageComponent} from './features/projects/project-page.component';
import {ProjectsPageComponent} from './features/projects/projects-page.component';

export const portfolioRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'bio', component: BioPageComponent },
  { path: 'projects', component: ProjectsPageComponent },
  { path: 'project/:id', component: ProjectPageComponent },
]
