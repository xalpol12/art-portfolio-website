import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Thumbnail} from '../../components/thumbnail/thumbnail';
import {ProjectThumbnailsStore} from './project-thumbnails.store';
import {SeoService} from '../../services/seo.service';
import {Store} from '../../store.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: `apw-projects-page`, template: `
    <div class="ngx-center ngx-page-padding-sides-only ngx-gallery-top-padding-mobile-only">
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
  projectThumbnailsStore = inject(ProjectThumbnailsStore);
  private readonly seo = inject(SeoService);
  private readonly store = inject(Store);

  thumbnails = this.projectThumbnailsStore.thumbnails;
  projects = this.projectThumbnailsStore.projects;

  constructor() {
    this.seo.setPage({
      title: 'Projects',
      description: `Browse the portfolio of ${this.store.config.name}`,
      path: '/projects',
    });
  }

  onThumbnailClick(id: string) {
    this.projectThumbnailsStore.onThumbnailClick(id);
  }
}
