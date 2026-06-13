import {PORTFOLIO_CONFIG, PortfolioConfig} from './portfolio.config';
import {EnvironmentProviders, makeEnvironmentProviders} from '@angular/core';
import {portfolioRoutes} from './lib.routes';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import {ContentService} from './services/content.service';
import {provideCloudinaryLoader} from '@angular/common';

export interface PortfolioProviderOptions {
  config: PortfolioConfig;
  /**
   * If true, the library will provide its own router configuration.
   * If false, you need to manually add portfolioRoutes to your app routes.
   * Default: true
   */
  provideRouting?: boolean;
}

export function providePortfolio(options: PortfolioProviderOptions): EnvironmentProviders {
  // Support both old API (just config) and new API (options object)
  const opts: PortfolioProviderOptions = { config: options.config, provideRouting: options.provideRouting ?? true };

  const providers: any[] = [
    {
      provide: PORTFOLIO_CONFIG,
      useValue: opts.config
    },
    ContentService,
  ];

  if (opts.config.cloudinaryCloudName) {
    providers.push(provideCloudinaryLoader(`https://res.cloudinary.com/${opts.config.cloudinaryCloudName}`));
  }

  if (opts.provideRouting) {
    providers.push(provideRouter(portfolioRoutes, withComponentInputBinding()) as any);
  }

  return makeEnvironmentProviders(providers);
}
