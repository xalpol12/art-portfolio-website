import {DOCUMENT} from '@angular/common';
import {inject, Injectable} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {Store} from '../store.service';
import {ThumbnailModel} from '../models/thumbnail.model';
import {stripHtml} from '../utils/strip-html';

export interface PageSeoOptions {
  title: string;
  description?: string;
  path: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  /** Set to false for the home page, where `title` already IS the site name. Default: true. */
  suffixSiteName?: boolean;
}

const JSON_LD_ELEMENT_ID = 'ngx-ap-jsonld';

/**
 * Sets per-route document title, meta description, Open Graph/Twitter tags,
 * canonical URL and JSON-LD structured data, sourced from {@link PortfolioConfig}
 * and the content being displayed. Call once per page component (typically from
 * a constructor `effect()`), mirroring the reactive wiring used elsewhere in the library.
 */
@Injectable({providedIn: 'root'})
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly store = inject(Store);

  setPage(options: PageSeoOptions): void {
    const config = this.store.config;
    const fullTitle = options.suffixSiteName === false
      ? options.title
      : `${options.title} — ${config.name}`;
    const description = options.description || config.siteTitle || config.name;
    const image = options.image || config.defaultOgImage;
    const url = config.baseUrl ? this.joinUrl(config.baseUrl, options.path) : undefined;

    this.title.setTitle(fullTitle);
    this.meta.updateTag({name: 'description', content: description});

    this.meta.updateTag({property: 'og:title', content: fullTitle});
    this.meta.updateTag({property: 'og:description', content: description});
    this.meta.updateTag({property: 'og:type', content: options.type ?? 'website'});
    if (url) {
      this.meta.updateTag({property: 'og:url', content: url});
    }
    if (image) {
      this.meta.updateTag({property: 'og:image', content: image});
    }

    this.meta.updateTag({name: 'twitter:card', content: image ? 'summary_large_image' : 'summary'});
    this.meta.updateTag({name: 'twitter:title', content: fullTitle});
    this.meta.updateTag({name: 'twitter:description', content: description});
    if (image) {
      this.meta.updateTag({name: 'twitter:image', content: image});
    }

    if (url) {
      this.setCanonical(url);
    }
    this.meta.removeTag('name="robots"');
  }

  setProjectSeo(thumbnail: ThumbnailModel, path: string): void {
    this.setPage({
      title: stripHtml(thumbnail.title),
      description: thumbnail.description ? stripHtml(thumbnail.description) : undefined,
      path,
      image: this.cloudinaryOgImage(thumbnail.imageUrl),
      type: 'article',
    });
  }

  setJsonLd(data: object): void {
    let script = this.document.getElementById(JSON_LD_ELEMENT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.id = JSON_LD_ELEMENT_ID;
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }

  setNoIndex(): void {
    this.meta.updateTag({name: 'robots', content: 'noindex, nofollow'});
  }

  private setCanonical(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private cloudinaryOgImage(imageUrl: string | undefined): string | undefined {
    const cloudName = this.store.config.cloudinaryCloudName;
    if (!imageUrl || !cloudName) {
      return this.store.config.defaultOgImage;
    }
    return `https://res.cloudinary.com/${cloudName}/image/upload/w_1200,h_630,c_fill,f_auto,q_auto/${imageUrl}`;
  }

  private joinUrl(baseUrl: string, path: string): string {
    return `${baseUrl.replace(/\/$/, '')}${path.startsWith('/') ? path : '/' + path}`;
  }
}
