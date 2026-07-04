import {Component, inject, Input, OnInit} from '@angular/core';
import {ImageDescriptionModel} from '../../models/project.model';
import {ArtworkDescriptionPipe} from '../../pipes/artwork-description-pipe';

@Component({
  selector: `apw-img-description`, template: `
    @if (description) {
      <div class="description ngx-ap-small">
        <span class="title">{{ descriptionParts[0] }}</span>
        <span class="details" [innerHTML]="descriptionParts[1]"></span>
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
  }
}
