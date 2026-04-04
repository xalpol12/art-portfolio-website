import {inject, Signal} from '@angular/core';
import {Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {ContentStore} from '../../services/content.store';
import {ProjectModel, ThumbnailModel} from '@ngx-artist-portfolio';

export class ProjectThumbnailsStore {
  store = inject(ContentStore);
  router = inject(Router);

  thumbnails: Signal<ThumbnailModel[]> = toSignal(this.store.getThumbnails$(), {initialValue: []});
  projects: Signal<ProjectModel[]> = toSignal(this.store.getProjects$(), {initialValue: []});

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
