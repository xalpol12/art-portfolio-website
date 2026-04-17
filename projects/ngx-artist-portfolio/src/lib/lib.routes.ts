import {Routes} from '@angular/router';
import {HomePageComponent} from './features/home-page.component';
import {BioPageComponent} from './features/bio-page.component';
import {ProjectComponent} from './features/projects/project.component';
import {ProjectsPageComponent} from './features/projects/projects-page.component';
import { ContactPageComponent } from "./features/contact-page.component";

export const portfolioRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'projects', component: ProjectsPageComponent },
  { path: 'projects/:id', component: ProjectComponent },
  { path: 'bio', component: BioPageComponent },
  { path: 'contact', component: ContactPageComponent},
  { path: '**', component: HomePageComponent }
]
