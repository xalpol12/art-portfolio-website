import {Component, inject, OnInit, Signal} from '@angular/core';
import {ContentService} from '../../services/content.service';
import {ProjectModel} from '../../models/project.model';
import {Thumbnail} from '../../components/thumbnail/thumbnail';
import {Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {ThumbnailModel} from '../../models/thumbnail.model';

@Component({
  selector: `apw-projects-page`, template: `
    <div class="ngx-center">
      @if (thumbnails()) {
        @for (thumbnail of thumbnails(); track $index) {
          <apw-thumbnail
            (clicked)="this.onThumbnailClick($event)"
            [thumbnail]="thumbnail"/>
        }
      }
    </div>
  `, standalone: true, imports: [Thumbnail]
})
export class ProjectsPageComponent implements OnInit {
  contentService = inject(ContentService);
  router = inject(Router)

  thumbnails: Signal<ThumbnailModel[]> = toSignal(this.contentService.fetchThumbnails$(), {initialValue: []});
  projects: Signal<ProjectModel[]> = toSignal(this.contentService.fetchProjects$(), {initialValue: []});


  ngOnInit(): void {
  }

  onThumbnailClick(id: string) {
    const project = this.projects().find(p => p.id === id);
    const thumbnail = this.thumbnails().find(t => t.id === id);

    this.router.navigate(['/project', id], {
      state: {
        project: project, thumbnail: thumbnail
      }
    });
  }

}
