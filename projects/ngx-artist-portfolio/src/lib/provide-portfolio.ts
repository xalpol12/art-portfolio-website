import {PORTFOLIO_CONFIG, PortfolioConfig} from './portfolio.config';
import {EnvironmentProviders, makeEnvironmentProviders} from '@angular/core';
import {portfolioRoutes} from './lib.routes';
import {provideRouter} from '@angular/router';

export function providePortfolio(config: PortfolioConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    {provide: PORTFOLIO_CONFIG, useValue: config},
    PortfolioService,
    provideRouter(portfolioRoutes)
  ])
}
