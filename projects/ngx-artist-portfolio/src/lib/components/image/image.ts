import {Component, Input} from '@angular/core';

@Component({
  selector: `apw-img`, template: `
    <div class="image-wrapper">
      <img [src]="image" [alt]="alt"/>
    </div>
  `, styleUrl: './image.scss', imports: []
})
export class Image {
  @Input() image: string | undefined;
  @Input() alt: string | undefined;

}
