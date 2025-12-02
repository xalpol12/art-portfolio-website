import { InjectionToken } from '@angular/core';

export interface PortfolioConfig {
  contentApiUrl: string,
  siteTitle?: string
}

export const PORTFOLIO_CONFIG = new InjectionToken<PortfolioConfig>('PORTFOLIO_CONFIG');
