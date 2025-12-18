import {Component, Input, output} from '@angular/core';
import {ThumbnailModel} from '../../models/project.model';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: `apw-thumbnail`, template: `
    @if (thumbnail) {
      <div class="thumbnail-container" (click)="clicked.emit(thumbnail.id)">
        <div class="thumbnail-image-wrapper">
          <img ngSrc="{{thumbnail.imageUrl}}" width="300" height="300" [alt]="thumbnail.title"/>
        </div>
        <div class="thumbnail-title">{{ thumbnail.title }}</div>
        <div class="thumbnail-description">{{ thumbnail.description }}</div>
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
  clicked = output<string>();
}
