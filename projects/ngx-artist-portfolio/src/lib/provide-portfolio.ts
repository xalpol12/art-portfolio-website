import {PORTFOLIO_CONFIG, PortfolioConfig} from './portfolio.config';
import {EnvironmentProviders, makeEnvironmentProviders, Provider} from '@angular/core';
import {buildPortfolioRoutes} from './lib.routes';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import {ContentService} from './services/content.service';
import {provideCloudinaryLoader} from '@angular/common';
import {CONTENT_BLOCK_EXTENSIONS, ContentBlockExtension} from './content-block-extensions.token';

export interface PortfolioProviderOptions {
  config: PortfolioConfig;
  /**
   * If true, the library will provide its own router configuration.
   * If false, you need to manually add portfolioRoutes to your app routes.
   * Default: true
   */
  provideRouting?: boolean;
  /** Renderers for custom content block types not built into the library. See `CustomBlockModel`. */
  contentBlockExtensions?: ContentBlockExtension[];
}

export function providePortfolio(options: PortfolioProviderOptions): EnvironmentProviders {
  // Support both old API (just config) and new API (options object)
  const opts: PortfolioProviderOptions = {
    config: options.config,
    provideRouting: options.provideRouting ?? true,
    contentBlockExtensions: options.contentBlockExtensions,
  };

  const providers: (Provider | EnvironmentProviders)[] = [
    {
      provide: PORTFOLIO_CONFIG,
      useValue: opts.config
    },
    ContentService,
  ];

  if (opts.config.cloudinaryCloudName) {
    providers.push(provideCloudinaryLoader(`https://res.cloudinary.com/${opts.config.cloudinaryCloudName}`));
  }

  if (opts.contentBlockExtensions?.length) {
    providers.push({provide: CONTENT_BLOCK_EXTENSIONS, useValue: opts.contentBlockExtensions});
  }

  if (opts.provideRouting) {
    providers.push(provideRouter(buildPortfolioRoutes(opts.config.routes), withComponentInputBinding()));
  }

  return makeEnvironmentProviders(providers);
}
