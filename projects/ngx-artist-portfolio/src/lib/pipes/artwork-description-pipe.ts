import {ImageDescriptionModel} from '@ngx-artist-portfolio';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'artworkDescription',
  standalone: true
})
export class ArtworkDescriptionPipe implements PipeTransform {
  transform(description: ImageDescriptionModel | undefined): string[] {
    if (!description) {
      return [];
    }
    const parts: string[] = [''];
    if (description.medium) {
      parts.push(description.medium);
    }
    if (description.size) {
      parts.push(description.size);
    }
    if (description.year) {
      parts.push(description.year);
    }
    if (description.additionalInfo) {
      parts.push(description.additionalInfo);
    }
    return [description.title ?? '', parts.join(', ')];
  }
}
