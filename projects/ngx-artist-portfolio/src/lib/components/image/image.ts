import {Component, Input} from '@angular/core';
import {ImageDescriptionModel} from '@ngx-artist-portfolio';
import {ImageDescription} from '../image-description/image-description';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: `apw-img`, template: `
    @if (image) {
      <div class="image-wrapper" [class.fill-mode]="!width || !height"
           [style.aspect-ratio]="(!width || !height) ? aspectRatio : null">
        @if (width && height) {
          <img [ngSrc]="image"
               [width]="width"
               [height]="height"
               [alt]="alt ?? ''"/>
        } @else {
          <img [ngSrc]="image"
               [fill]="true"
               [alt]="alt ?? ''"/>
        }
      </div>
      @if (description) {
        <apw-img-description [description]="description"></apw-img-description>
      }
    }
  `, styleUrl: './image.scss', imports: [
    ImageDescription,
    NgOptimizedImage
  ]
})
export class Image {
  @Input() image: string | undefined;
  @Input() alt: string | undefined;
  @Input() description: ImageDescriptionModel | undefined;
  @Input() width: number | undefined;
  @Input() height: number | undefined;
  /** CSS aspect-ratio value used in fill mode, e.g. '4/3', '16/9', '1/1'. Default: '4/3' */
  @Input() aspectRatio: string = '4/3';
}
