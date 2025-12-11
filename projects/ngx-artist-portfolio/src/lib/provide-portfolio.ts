import {PORTFOLIO_CONFIG, PortfolioConfig} from './portfolio.config';
import {EnvironmentProviders, makeEnvironmentProviders} from '@angular/core';
import {portfolioRoutes} from './lib.routes';
import {provideRouter} from '@angular/router';
import {ContentService} from './services/content.service';

export function providePortfolio(config: PortfolioConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    {provide: PORTFOLIO_CONFIG, useValue: config},
    ContentService,
    provideRouter(portfolioRoutes)
  ])
}
