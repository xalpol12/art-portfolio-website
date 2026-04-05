import {inject, Signal} from '@angular/core';
import {Router} from '@angular/router';
import {ContentSignalStore} from '../../services/content-signal-store.service';
import {ProjectModel, ThumbnailModel} from '@ngx-artist-portfolio';

export class ProjectThumbnailsStore {
  store = inject(ContentSignalStore);
  router = inject(Router);

  thumbnails: Signal<ThumbnailModel[]> = this.store.thumbnails();
  projects: Signal<ProjectModel[]> = this.store.projects();

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
