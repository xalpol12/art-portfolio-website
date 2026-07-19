import {Component, Input, output} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {ThumbnailModel} from "../../models/thumbnail.model";

@Component({
  selector: `apw-thumbnail`, template: `
    @if (thumbnail) {
      <div class="thumbnail-container" (click)="clicked.emit(thumbnail.id)"
           [class.padding-bottom]="paddingBottom"
           [class.constrain-to-viewport]="constrainToViewport">
        <div class="thumbnail-image-wrapper">
          <img [ngSrc]="thumbnail.imageUrl"
               [width]="thumbnail.width"
               [height]="thumbnail.height"
               [priority]="isPriority"
               [alt]="thumbnail.title"
               placeholder
          />
        </div>
        <div class="thumbnail-title ngx-ap-title" [innerHtml]="thumbnail.title"></div>
        <div class="">{{ thumbnail.description }}</div>
      </div>
    }
  `, standalone: true,
  imports: [
    NgOptimizedImage
  ],
  styleUrl: 'thumbnail.scss'
})
export class Thumbnail {
  @Input() thumbnail: ThumbnailModel | undefined;
  @Input() paddingBottom = false;
  @Input() isPriority = false;
  @Input() constrainToViewport = false;
  clicked = output<string>();
}
