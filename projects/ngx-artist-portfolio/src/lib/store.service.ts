import {Injectable, Inject, Optional} from '@angular/core';
import {PortfolioConfig, PORTFOLIO_CONFIG} from '@ngx-artist-portfolio';

@Injectable({providedIn: 'root'})
export class Store {
  config: PortfolioConfig;

  constructor(@Optional() @Inject(PORTFOLIO_CONFIG) config: PortfolioConfig | null) {
    if (!config) {
      throw new Error('PortfolioConfig is required but was not provided. Please provide it using providePortfolio({ config: yourConfig }) in your app configuration.');
    } else {
      this.config = config;
    }
  }
}
