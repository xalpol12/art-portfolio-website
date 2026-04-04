import {Component, Input} from '@angular/core';
import {GalleryGridConfig, GalleryGridModel} from '../../models/project.model';
import {Image} from '../image/image';
import {ImageDescription} from '../image-description/image-description';

@Component({
  selector: `apw-gallery-grid`, template: `
    <div class="gallery"
         [style.--ngx-ap-gap-standard.px]="config.gap"
         [class.vertical]="config.orientation === 'vertical'">
      @for (image of data?.data; track $index) {
        <apw-img [image]="image" [alt]="'Gallery Image {{$index + 1}}'"
                 (click)="openLightbox($index)"
        />
      }
    </div>
    @if (data?.description) {
      <apw-img-description [description]="data?.description">
      </apw-img-description>
    }

    <apw-img-lightbox>
    </apw-img-lightbox>
  `, styleUrl: './gallery-grid.scss', imports: [
    Image,
    ImageDescription
  ]
})
export class GalleryGrid {
  @Input() data: GalleryGridModel | undefined;

  lightboxOpen: boolean = false;
  lightboxIndex: number = 0;

  static DEFAULT_CONFIG = {orientation: 'horizontal', gap: 8};
  // TODO: optimize images (dont display full res if not needed)
  // TODO: create image wrapper - each image click should open "modal" with zoomed image full screen and ability to swipe left/right to see other images"

  get config(): GalleryGridConfig {
    return <GalleryGridConfig>this.data?.config || GalleryGrid.DEFAULT_CONFIG;
  }

  openLightbox(index: number): void {
    this.lightboxIndex = index;
    this.lightboxOpen = true;
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
  }

  onIndexChanged(index: number): void {
    this.lightboxIndex = index;
  }
}
