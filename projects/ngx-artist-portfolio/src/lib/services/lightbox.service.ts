import {computed, inject, Injectable, Signal, signal} from '@angular/core';
import {ContentModel, ContentType, GalleryGridModel, ImageModel} from '@ngx-artist-portfolio';
import {Store} from '../store.service';

@Injectable()
export class LightboxService {
  private store: Store = inject(Store);
  readonly zoomDisabled = signal(this.store.config.disableLightboxZoom ?? false);
  private readonly _isOpen = signal(false);
  readonly isOpen = this._isOpen.asReadonly();
  private readonly _currentIndex = signal(0);
  readonly currentIndex = this._currentIndex.asReadonly();
  private readonly _images = signal<string[]>([]);
  readonly images = this._images.asReadonly();

  readonly currentImage = computed(() => this._images()[this._currentIndex()] ?? '');

  loadImages(content: ContentModel[]): void {
    const images: string[] = [];
    for (const block of content) {
      if (block.type === ContentType.IMAGE) {
        images.push((block as ImageModel).image);
      } else if (block.type === ContentType.GALLERY_GRID) {
        images.push(...((block as GalleryGridModel).data ?? []));
      }
    }
    this._images.set(images);
  }

  getStartIndexFor(block: ContentModel, content: ContentModel[]): number {
    let index = 0;
    for (const item of content) {
      if (item === block) break;
      if (item.type === ContentType.IMAGE) index++;
      else if (item.type === ContentType.GALLERY_GRID) index += ((item as GalleryGridModel).data?.length ?? 0);
    }
    return index;
  }

  open(index: number): void {
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
