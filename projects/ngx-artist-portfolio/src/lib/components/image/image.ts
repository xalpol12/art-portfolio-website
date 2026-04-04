import {Component, Input} from '@angular/core';
import {ImageDescriptionModel} from '@ngx-artist-portfolio';
import {ImageDescription} from '../image-description/image-description';

@Component({
  selector: `apw-img`, template: `
    <div class="image-wrapper">
      <img [src]="image" [alt]="alt"/>
    </div>
    @if (description) {
      <apw-img-description [description]="description"></apw-img-description>
    }
  `, styleUrl: './image.scss', imports: [
    ImageDescription
  ]
})
export class Image {
  @Input() image: string | undefined;
  @Input() alt: string | undefined;
  @Input() description: ImageDescriptionModel | undefined;

}
