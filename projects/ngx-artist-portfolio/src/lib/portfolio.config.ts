import { InjectionToken } from '@angular/core';
import {ContactModel} from './models/contact.model';

export interface PortfolioConfig {
  contentApiUrl: string,
  name: string,
  contact: ContactModel
  cacheExpirationTimeMs: number,
  siteTitle?: string,
  cloudinaryCloudName?: string,
}

export const PORTFOLIO_CONFIG = new InjectionToken<PortfolioConfig>('PORTFOLIO_CONFIG');
