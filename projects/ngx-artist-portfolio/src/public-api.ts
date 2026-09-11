/*
 * Public API Surface of ngx-artist-portfolio
 */

// Main component
export * from './lib/features/layout.component';

// Components
export * from './lib/components/footer/footer';
export * from './lib/components/navbar/navbar';
export * from './lib/components/thumbnail/thumbnail';
export * from './lib/components/paragraph/paragraph';
export * from './lib/components/gallery-grid/gallery-grid';
export * from './lib/components/quote/quote';
export * from './lib/components/video/video';
export * from './lib/components/project-nav/project-nav';

// Icons
export * from './lib/components/icons/email-icon';
export * from './lib/components/icons/instagram-icon';
export * from './lib/components/icons/facebook-icon';
export * from './lib/components/icons/twitter-icon';

// Feature Components (Pages)
export * from './lib/features/home-page.component';
export * from './lib/features/bio-page.component';
export * from './lib/features/layout.component';
export * from './lib/features/projects/project.component';
export * from './lib/features/projects/projects-page.component';
export * from './lib/features/projects/project-renderer.component';
export * from './lib/features/not-found-page.component';

// Services
export * from './lib/services/content.service';
export * from './lib/services/content-signal-store.service';
export * from './lib/services/seo.service';
export * from './lib/store.service';

// Models
export * from './lib/models/project.model';
export * from './lib/models/thumbnail.model';
export * from './lib/models/content-type';
export * from './lib/models/contact.model';

// Configuration & Providers
export * from './lib/portfolio.config';
export * from './lib/provide-portfolio';
export * from './lib/lib.routes';
export * from './lib/content-block-extensions.token';
