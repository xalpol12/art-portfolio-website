import {ChangeDetectionStrategy, Component, Input, signal} from '@angular/core';
import {ImageDescriptionModel} from '../../models/project.model';
import {ImageDescription} from '../image-description/image-description';
import {NgOptimizedImage} from '@angular/common';
import {clampDimensions} from '../../utils/clamp-dimensions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: `apw-img`, template: `
    @if (image) {
      <div class="image-wrapper"
           [class.fill-mode]="!galleryMode && (!width || !height)"
           [class.gallery-mode]="galleryMode"
           [style.aspect-ratio]="!width || !height ? aspectRatio : null"
           [class.bottom-margin]="!galleryMode">
        @if (loading()) {
          <div class="spinner-wrapper">
            <div class="spinner"></div>
          </div>
        }
        @if (width && height) {
          @let size = clampDimensions(width, height);
          <img [ngSrc]="image"
               [width]="size.width"
               [height]="size.height"
               [alt]="alt ?? ''"
               [class.loaded]="!loading()"
               placeholder
               (load)="loading.set(false)"
          />
        } @else if (galleryMode) {
          <img [ngSrc]="image"
               [alt]="alt ?? ''"
               [class.loaded]="!loading()"
               loading="lazy"
               (load)="loading.set(false)" fill/>
        } @else {
          <img [ngSrc]="image"
               [fill]="true"
               [alt]="alt ?? ''"
               [class.loaded]="!loading()"
               placeholder
               (load)="loading.set(false)"/>
        }
        @if (description) {
          <apw-img-description [description]="description"></apw-img-description>
        }
      </div>
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
  @Input() aspectRatio: string = '4/3';
  @Input() galleryMode: boolean = false;

  protected loading = signal(true);

  protected readonly clampDimensions = clampDimensions;
}
