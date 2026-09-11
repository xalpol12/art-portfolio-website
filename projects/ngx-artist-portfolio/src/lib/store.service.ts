import {Injectable, Inject, Optional, signal} from '@angular/core';
import {PortfolioConfig, PORTFOLIO_CONFIG} from './portfolio.config';

/**
 * Holds the resolved `PortfolioConfig` plus small pieces of cross-page UI state.
 * Advanced/internal use — most consumers reading project or thumbnail data should use
 * `ContentSignalStore` instead; use `Store` when you need `config` directly (e.g. to build
 * a custom page that reads `contact`, `routes` or `labels`).
 */
@Injectable({providedIn: 'root'})
export class Store {
  config: PortfolioConfig;
  readonly homeClicks = signal(0);
  /** Id of the project last shown by `RandomProjectComponent`, so it isn't immediately repeated. */
  readonly lastRandomProjectId = signal<string | undefined>(undefined);

  onHomeClick(): void {
    this.homeClicks.update(v => v + 1);
  }

  constructor(@Optional() @Inject(PORTFOLIO_CONFIG) config: PortfolioConfig | null) {
    if (!config) {
      throw new Error('PortfolioConfig is required but was not provided. Please provide it using providePortfolio({ config: yourConfig }) in your app configuration.');
    } else {
      this.config = config;
    }
  }
}
