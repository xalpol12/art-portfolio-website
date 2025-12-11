import {Routes} from '@angular/router';
import {inject} from '@angular/core';
import {ContentService} from './services/content.service';
import {HomePageComponent} from './features/home-page.component';
import {BioPageComponent} from './features/bio-page.component';
import {ProjectPageComponent} from './features/project-page.component';
import {LayoutComponent} from './features/layout.component';

const dataResolver = () =>inject(ContentService).fetchContent();

export const portfolioRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    resolve: { data: dataResolver() },
    children: [
      { path: '', component: HomePageComponent },
      { path: 'bio', component: BioPageComponent },
      { path: 'project/:id', component: ProjectPageComponent },
    ]
  }

]
