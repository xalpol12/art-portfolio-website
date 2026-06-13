import {Injectable, Inject, Optional, signal} from '@angular/core';
import {PortfolioConfig, PORTFOLIO_CONFIG} from './portfolio.config';

@Injectable({providedIn: 'root'})
export class Store {
  config: PortfolioConfig;
  readonly homeClicks = signal(0);

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
