import {Component, Input} from '@angular/core';
import {ImageDescriptionModel} from '@ngx-artist-portfolio';
import {ArtworkDescriptionPipe} from '../../pipes/artwork-description-pipe';

@Component({
  selector: `apw-img-description`, template: `
    @if (description) {
      <div class="description">
        <span>{{description | artworkDescription}}</span>
      </div>
    }
  `, standalone: true, imports: [
    ArtworkDescriptionPipe
  ], styleUrl: 'image-description.scss'
})
export class ImageDescription {
  @Input() description: ImageDescriptionModel | undefined;

  get descriptionString(): string {
    return JSON.stringify(this.description);

  }
}
