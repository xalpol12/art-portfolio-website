import {computed, inject, Injectable, signal} from '@angular/core';
import {GalleryGridModel, ImageModel, ProjectContentBlock} from '../models/project.model';
import {ContentType} from '../models/content-type';
import {Store} from '../store.service';
import {stripHtml} from '../utils/strip-html';

export interface LightboxImage {
  src: string;
  alt: string;
}

@Injectable()
export class LightboxService {
  private store: Store = inject(Store);
  readonly zoomDisabled = signal(this.store.config.disableLightboxZoom ?? false);
  private readonly _isOpen = signal(false);
  readonly isOpen = this._isOpen.asReadonly();
  private readonly _currentIndex = signal(0);
  readonly currentIndex = this._currentIndex.asReadonly();
  private readonly _images = signal<LightboxImage[]>([]);
  readonly images = this._images.asReadonly();

  /** Element that had focus when the lightbox was opened, so it can be restored on close. */
  triggerElement: HTMLElement | null = null;

  readonly currentImage = computed(() => this._images()[this._currentIndex()]?.src ?? '');

  loadImages(content: ProjectContentBlock[]): void {
    const images: LightboxImage[] = [];
    for (const block of content) {
      if (block.type === ContentType.IMAGE) {
        const image = block as ImageModel;
        images.push({src: image.image, alt: stripHtml(image.description?.title) || ''});
      } else if (block.type === ContentType.GALLERY_GRID) {
        const gallery = block as GalleryGridModel;
        const galleryAlt = stripHtml(gallery.description?.title);
        (gallery.data ?? []).forEach((src, i) => {
          images.push({src, alt: galleryAlt || `Gallery image ${i + 1}`});
        });
      }
    }
    this._images.set(images);
    this._currentIndex.set(0);
    this._isOpen.set(false);
  }

  getStartIndexFor(block: ProjectContentBlock, content: ProjectContentBlock[]): number {
    let index = 0;
    for (const item of content) {
      if (item === block) break;
      if (item.type === ContentType.IMAGE) index++;
      else if (item.type === ContentType.GALLERY_GRID) index += ((item as GalleryGridModel).data?.length ?? 0);
    }
    return index;
  }

  open(index: number, triggerElement?: EventTarget | null): void {
    this.triggerElement = (triggerElement instanceof HTMLElement ? triggerElement : null)
      ?? (document.activeElement as HTMLElement | null);
    this._currentIndex.set(index);
    this._isOpen.set(true);
  }

  close(): void {
    this._isOpen.set(false);
  }

  goTo(index: number): void {
    const total = this._images().length;
    if (total === 0) return;
    this._currentIndex.set((index + total) % total);
  }
}
