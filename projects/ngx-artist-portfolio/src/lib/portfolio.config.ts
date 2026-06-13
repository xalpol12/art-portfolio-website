import { InjectionToken } from '@angular/core';
import {ContactModel} from './models/contact.model';
import {ProjectModel} from './models/project.model';
import {ThumbnailModel} from './models/thumbnail.model';

export interface PortfolioStaticData {
  projects: ProjectModel[];
  thumbnails: ThumbnailModel[];
  bio: ProjectModel;
}

export interface PortfolioConfig {
  name: string,
  contact: ContactModel,
  siteTitle?: string,
  cloudinaryCloudName?: string,
  disableLightboxZoom?: boolean,
  /** Static data baked in at build time. If provided, no HTTP calls are made. */
  data: PortfolioStaticData
}

export const PORTFOLIO_CONFIG = new InjectionToken<PortfolioConfig>('PORTFOLIO_CONFIG');
