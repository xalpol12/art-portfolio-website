import {Component, Input, output} from '@angular/core';
import {ThumbnailModel} from '../../models/project.model';

@Component({
  selector: `apw-thumbnail`, template: `
    @if (thumbnail) {
      <div (click)="clicked.emit(thumbnail.id)">
        <div>{{ thumbnail.imageUrl }}</div>
        <div>{{ thumbnail.title }}</div>
        <div>{{ thumbnail.description }}</div>
      </div>
    }
  `, standalone: true, styleUrl: 'thumbnail.scss'
})
export class Thumbnail {
  @Input() thumbnail: ThumbnailModel | undefined;
  clicked = output<string>();
}
