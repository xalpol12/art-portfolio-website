import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GalleryGridConfig, GalleryGridModel} from '../../models/project.model';
import {Image} from '../image/image';
import {ImageDescription} from '../image-description/image-description';

@Component({
  selector: `apw-gallery-grid`, template: `
    <div class="gallery-wrapper">
      <div class="gallery"
           [style.--ngx-ap-gap-standard.px]="config.gap"
           [class.vertical]="config.orientation === 'vertical'">
        @for (image of data?.data; track $index) {
          <apw-img [image]="image" [alt]="'Gallery Image ' + ($index + 1)"
                   [galleryMode]="true"
                   [width]="config.width"
                   [height]="config.height"
                   (click)="onImageClick($index)"
          />
        }
      </div>
      @if (data?.description) {
        <apw-img-description class="gallery-description" [description]="data?.description">
        </apw-img-description>
      }
    </div>
  `, styleUrl: './gallery-grid.scss', imports: [
    Image,
    ImageDescription
  ]
})
export class GalleryGrid {
  @Input() data: GalleryGridModel | undefined;
  static readonly DEFAULT_CONFIG = {orientation: 'horizontal', gap: 8};
  @Input() startIndex: number = 0;
  @Output() imageClicked = new EventEmitter<number>();

  get config(): GalleryGridConfig {
    return <GalleryGridConfig>this.data?.config || GalleryGrid.DEFAULT_CONFIG;
  }

  onImageClick(localIndex: number): void {
    this.imageClicked.emit(this.startIndex + localIndex);
  }
}
