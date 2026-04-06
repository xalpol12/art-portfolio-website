import {Component, computed, Signal} from '@angular/core';
import {Thumbnail, ThumbnailModel} from '@ngx-artist-portfolio';
import {ProjectThumbnailsStore} from './project-thumbnails.store';

@Component({
  selector: `apw-random-project`,
  template: `
    @if (thumbnail()) {
      <apw-thumbnail class="ngx-center"
                     [thumbnail]="thumbnail()"
                     [paddingBottom]="false"
                     (clicked)="projectThumbnailsStore.onThumbnailClick(thumbnail().id)"
      />
    }
  `,
  standalone: true,
  imports: [
    Thumbnail
  ]
})
export class RandomProjectComponent {
  projectThumbnailsStore = new ProjectThumbnailsStore();

  thumbnail: Signal<ThumbnailModel> = computed(() => {
    const projects = this.projectThumbnailsStore.projects;
    const thumbnails = this.projectThumbnailsStore.thumbnails;
    const randomIndex = Math.floor(Math.random() * projects().length);
    return thumbnails().find(t => t.id === projects()[randomIndex].id)!;
  });
}
