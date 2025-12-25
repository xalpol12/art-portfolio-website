import {Component, Input} from '@angular/core';
import {GalleryGridConfig, GalleryGridModel} from '../../models/project.model';
import {Image} from '../image/image';

@Component({
  selector: `apw-gallery-grid`, template: `
    <div class="gallery"
         [style.--ngx-ap-gap-standard.px]="config.gap"
         [class.vertical]="config.orientation === 'vertical'"
    >
      @for (image of data?.data; track $index) {
        <apw-img [image]="image" [alt]="'Gallery Image {{$index + 1}}'"/>
      }
    </div>
    <div class="description">
      <span>{{ "Description" }}</span>
    </div>
  `, styleUrl: './gallery-grid.scss', imports: [
    Image
  ]
})
export class GalleryGrid {
  @Input() data: GalleryGridModel | undefined;
  static DEFAULT_CONFIG = {orientation: 'horizontal', gap: 8};
  // TODO: optimize images (dont display full res if not needed)
  // TODO: create image wrapper - each image click should open "modal" with zoomed image full screen and ability to swipe left/right to see other images"

  get config(): GalleryGridConfig {
    return <GalleryGridConfig>this.data?.config || GalleryGrid.DEFAULT_CONFIG;
  }
}
