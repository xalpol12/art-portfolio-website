import {Component, inject, Input, OnInit} from '@angular/core';
import {ImageDescriptionModel} from '@ngx-artist-portfolio';
import {ArtworkDescriptionPipe} from '../../pipes/artwork-description-pipe';

@Component({
  selector: `apw-img-description`, template: `
    @if (description) {
      <div class="description ngx-ap-small">
        <span class="title">{{ descriptionParts[0] }}</span>
        <span class="details">{{ descriptionParts[1] }}</span>
      </div>
    }
  `, standalone: true, providers: [ArtworkDescriptionPipe], styleUrl: 'image-description.scss'
})
export class ImageDescription implements OnInit {
  @Input() description: ImageDescriptionModel | undefined;
  descriptionParts: string[] = [];
  private readonly pipe: ArtworkDescriptionPipe = inject(ArtworkDescriptionPipe);

  ngOnInit() {
    this.descriptionParts = this.pipe.transform(this.description);
    console.error('ImageDescription constructor called with description:', this.description);
  }
}
