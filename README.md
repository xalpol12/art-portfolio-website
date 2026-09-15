> [!NOTE]
> This repository contains component library `./ngx-artist-portfolio` available as a package on npm [@xalpol12/artist-portfolio](https://www.npmjs.com/package/@xalpol12/artist-portfolio).
> See `projects/showcase-app` in this workspace for a working example.

# @xalpol12/artist-portfolio

Reusable Angular building blocks for artist portfolio sites: a thumbnail grid, project
detail pages composed from content blocks (paragraph, image, video, gallery grid, quote,
link), Cloudinary-backed image loading, and per-page SEO (title/meta/Open Graph/JSON-LD).

## Install

```bash
npm install @xalpol12/artist-portfolio
```

Peer dependencies: `@angular/common`, `@angular/core`, `@angular/platform-browser`,
`@angular/router` (all `^21.0.0`).

## Quick start

```ts
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { providePortfolio } from '@xalpol12/artist-portfolio';
import projectsData from './assets/data/projects.json';
import thumbnailsData from './assets/data/thumbnails.json';
import bioData from './assets/data/bio.json';

export const appConfig: ApplicationConfig = {
  providers: [
    providePortfolio({
      config: {
        name: 'Your Artist Name',
        contact: { email: 'artist@example.com', instagram: 'handle' },
        cloudinaryCloudName: 'your-cloud-name',
        baseUrl: 'https://your-domain.com', // enables canonical/OG URLs and JSON-LD
        data: {
          projects: projectsData as any,
          thumbnails: thumbnailsData as any,
          bio: bioData as any,
        },
      },
    }),
  ],
};
```

`providePortfolio` registers the router (home/projects/project-detail/bio/contact +
a 404 fallback), the Cloudinary image loader, and the portfolio config used throughout
the library. Pass `provideRouting: false` if you want to compose `portfolioRoutes` (or
`buildPortfolioRoutes(...)`) into your own route tree instead.

Import the library styles once, in your app's global stylesheet:

```scss
@use '@xalpol12/artist-portfolio/styles/main';
```

## Content model

A project (`ProjectModel`) is an `id` plus a `content` array of blocks:

| `type`         | Model               | Notes                                                   |
|----------------|---------------------|----------------------------------------------------------|
| `paragraph`    | `ParagraphModel`    | `data` is a plain or HTML string                          |
| `image`        | `ImageModel`        | `image` is a Cloudinary public id; set `width`/`height` to avoid layout shift |
| `gallery-grid` | `GalleryGridModel`  | `data` is an array of Cloudinary public ids               |
| `video`        | `VideoModel`        | YouTube/Vimeo embed or a file source                       |
| `quote`        | `QuoteModel`        | `text`, optional `author`/`cite`                           |
| `link`         | `LinkModel`         | `data: { link, text }`                                     |
| `break`        | `BasicModel`        | Visual spacer                                              |

### Custom block types

The built-in switch only knows the types above. To add your own (e.g. `audio`), register
a component for it instead of forking the library:

```ts
providePortfolio({
  config: { /* ... */ },
  contentBlockExtensions: [
    { type: 'audio', component: AudioBlockComponent },
  ],
});
```

Your component receives the raw block object via a `block` input:

```ts
@Component({ selector: 'app-audio-block', template: `<audio [src]="block.src" controls></audio>` })
export class AudioBlockComponent {
  @Input() block!: { type: 'audio'; src: string };
}
```

Give the block's `type` any string not already used by a built-in type — see
`CustomBlockModel` and `ContentBlockExtension`.

## Configuration

`PortfolioConfig` (passed to `providePortfolio({ config })`):

- `name`, `contact`, `siteTitle` — identity and contact links (`ContactModel`).
- `cloudinaryCloudName` — required for `NgOptimizedImage` to resolve `image`/`imageUrl`
  fields, which are Cloudinary public ids, not full URLs.
- `baseUrl` — your deployed origin; enables canonical URLs, `og:url`/`og:image`, and the
  sitemap generator. Without it those tags are simply omitted.
- `defaultOgImage` — fallback social-share image for pages with no page-specific image.
- `disableLightboxZoom` — turn off pinch/scroll/double-click zoom in the image lightbox.
- `routes` — rename the default `projects`/`bio`/`contact` URL segments (see below).
- `labels` — override built-in UI copy (nav labels, prev/next, footer credit); defaults
  are English.
- `data` — your `projects`, `thumbnails`, and `bio` content (`PortfolioStaticData`).

### Renaming routes

```ts
providePortfolio({
  config: {
    routes: { projects: 'work', bio: 'about' }, // detail page becomes /work/:id
    /* ... */
  },
});
```

### Overriding UI copy

```ts
providePortfolio({
  config: {
    labels: {
      nav: { projects: 'Gallery', bio: 'Bio', contact: 'Contact' },
      projectNav: { previous: 'Previous', next: 'Next' },
    },
    /* ... */
  },
});
```

## Theming

Colors, spacing, and typography are exposed as CSS custom properties in `_tokens.scss`
(prefixed `--ngx-ap-*`). Override them on `:root` or `.ngx-artist-portfolio-theme` after
importing the library styles — no `::ng-deep` needed. Key tokens:

- `--ngx-ap-primary`, `--ngx-ap-secondary`, `--ngx-ap-accent` — brand colors.
- `--ngx-ap-bg-main`, `--ngx-ap-text-primary`, `--ngx-ap-text-secondary` — surface/text colors.
- `--ngx-ap-font-family`, `--ngx-ap-font-size-*` — typography.
- `--ngx-ap-gutter*`, `--ngx-ap-content-gutter*` — spacing scale used across pages.

## SEO

Every built-in page sets its own `<title>`, meta description, Open Graph/Twitter tags,
and canonical URL via `SeoService`; project pages additionally emit `VisualArtwork`
JSON-LD sourced from the project's image description (medium/size/year). Set
`PortfolioConfig.baseUrl` to enable canonical/OG URLs. If you build custom pages, inject
`SeoService` and call `setPage(...)` / `setJsonLd(...)` yourself.

A sitemap/robots.txt generator lives at
`projects/showcase-app/scripts/generate-sitemap.mjs` in this workspace — copy it into
your own app and run it before `ng build` with `SITE_BASE_URL` set.
