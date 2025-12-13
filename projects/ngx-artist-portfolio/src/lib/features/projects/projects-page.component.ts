import {Component, inject, OnInit, Signal, signal} from '@angular/core';
import {ContentService} from '../../services/content.service';
import {ProjectModel, ThumbnailModel} from '../../models/project.model';
import {Thumbnail} from '../../components/thumbnail/thumbnail';
import {Router} from '@angular/router';

@Component({
  selector: `apw-projects-page`, template: `
      Projects Page Component Works!
      @if (thumbnails()) {
        @for (thumbnail of thumbnails(); track $index) {
          <apw-thumbnail
            (clicked)="this.onThumbnailClick($event)"
            [thumbnail]="thumbnail"/>
        }
      }
  `, standalone: true, imports: [Thumbnail]
})
export class ProjectsPageComponent implements OnInit {
  thumbnails: Signal<ThumbnailModel[]> = signal<ThumbnailModel[]>([]);
  projects: Signal<ProjectModel[]> = signal<ProjectModel[]>([]);

  contentService = inject(ContentService);
  router = inject(Router)

  ngOnInit(): void {
    this.thumbnails = this.contentService.fetchThumbnails();
    this.projects = this.contentService.fetchProjects();
  }

  onThumbnailClick(id: string) {
    const project = this.projects().find(p => p.id === id);
    const thumbnail = this.thumbnails().find(t => t.id === id);

    this.router.navigate(['/project', id], {
      state: {
        project: project,
        thumbnail: thumbnail
      }
    });
  }

}
