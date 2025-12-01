import { Routes } from '@angular/router';
import {Bio} from './features/bio/bio';
import {Home} from './features/home/home';
import {ProjectDetails} from './features/project-details/project-details';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home Page'
  },
  {
    path: 'bio',
    component: Bio,
    title: 'Bio Page'
  },
  {
    path: 'project/:id',
    component: ProjectDetails
  },
  {
    path: '**',
    redirectTo: ''
  }
];
