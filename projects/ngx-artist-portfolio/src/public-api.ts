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

// Feature Components (Pages)
export * from './lib/features/home-page.component';
export * from './lib/features/bio-page.component';
export * from './lib/features/layout.component';
export * from './lib/features/projects/project.component';
export * from './lib/features/projects/projects-page.component';
export * from './lib/features/projects/project-renderer.component';

// Services
export * from './lib/services/content.service';

// Models
export * from './lib/models/project.model';
export * from './lib/models/thumbnail.model';
export * from './lib/models/content-type';

// Configuration & Providers
export * from './lib/portfolio.config';
export * from './lib/provide-portfolio';
export * from './lib/lib.routes';
