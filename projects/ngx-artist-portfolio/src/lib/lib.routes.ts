import {Routes} from '@angular/router';
import {inject} from '@angular/core';

const dataResolver = () =>inject(PortfolioService).loadData();

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
