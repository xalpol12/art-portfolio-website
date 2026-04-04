import {Component} from '@angular/core';
import {Thumbnail} from '../../components/thumbnail/thumbnail';
import {ProjectThumbnailsStore} from './project-thumbnails.store';

@Component({
  selector: `apw-projects-page`, template: `
    <div class="ngx-center">
      @if (thumbnails()) {
        @for (thumbnail of thumbnails(); track $index) {
          <apw-thumbnail
            (clicked)="this.onThumbnailClick($event)"
            [thumbnail]="thumbnail"
            [paddingBottom]="true"/>
        }
      }
    </div>
  `, standalone: true, imports: [Thumbnail]
})
export class ProjectsPageComponent {
  projectThumbnailsStore = new ProjectThumbnailsStore();

  thumbnails = this.projectThumbnailsStore.thumbnails;
  projects = this.projectThumbnailsStore.projects;

  onThumbnailClick(id: string) {
    this.projectThumbnailsStore.onThumbnailClick(id);
  }
}
