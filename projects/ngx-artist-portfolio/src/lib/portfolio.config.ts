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
  data: PortfolioStaticData
}

export const PORTFOLIO_CONFIG = new InjectionToken<PortfolioConfig>('PORTFOLIO_CONFIG');
