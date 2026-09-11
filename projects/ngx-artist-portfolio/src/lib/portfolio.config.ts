import { InjectionToken } from '@angular/core';
import {ContactModel} from './models/contact.model';
import {ProjectModel} from './models/project.model';
import {ThumbnailModel} from './models/thumbnail.model';

export interface PortfolioStaticData {
  projects: ProjectModel[];
  thumbnails: ThumbnailModel[];
  bio: ProjectModel;
}

/**
 * Overrides the URL segments used by `portfolioRoutes`. Any segment left unset keeps its
 * default. `projectDetail` defaults to whatever `projects` resolves to (so the detail page
 * lives at `{projectDetail}/:id`) — set it separately if the list and detail pages should
 * live under different segments (e.g. list at `gallery`, detail at `work/:id`).
 */
export interface PortfolioRoutesConfig {
  projects?: string;
  projectDetail?: string;
  bio?: string;
  contact?: string;
}

/** Overrides for built-in UI copy, so consumers aren't locked into the library's default English strings. */
export interface PortfolioLabelsConfig {
  nav?: {
    projects?: string;
    bio?: string;
    contact?: string;
  };
  projectNav?: {
    previous?: string;
    next?: string;
  };
  footer?: {
    creditText?: string;
    creditName?: string;
    creditUrl?: string;
  };
}

export interface PortfolioConfig {
  name: string,
  contact: ContactModel,
  siteTitle?: string,
  cloudinaryCloudName?: string,
  disableLightboxZoom?: boolean,
  /**
   * Absolute origin of the deployed site (e.g. `https://myartist.com`), used to build
   * canonical URLs, Open Graph `og:url`/`og:image` and JSON-LD. Without it, canonical/OG
   * tags are omitted rather than emitted with a wrong or relative URL.
   */
  baseUrl?: string,
  /**
   * Absolute URL of a fallback social-share image used when a page has no page-specific
   * image (e.g. bio/contact pages).
   */
  defaultOgImage?: string,
  /** Renames the default route segments (`projects`, `bio`, `contact`). */
  routes?: PortfolioRoutesConfig,
  /** Overrides built-in UI copy (nav labels, prev/next, footer credit). */
  labels?: PortfolioLabelsConfig,
  data: PortfolioStaticData
}

export const PORTFOLIO_CONFIG = new InjectionToken<PortfolioConfig>('PORTFOLIO_CONFIG');
