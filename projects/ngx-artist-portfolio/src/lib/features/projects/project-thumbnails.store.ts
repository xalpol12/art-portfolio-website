import {inject, Signal} from '@angular/core';
import {Router} from '@angular/router';
import {ContentSignalStore} from '../../services/content-signal-store.service';
import {ProjectModel} from '../../models/project.model';
import {ThumbnailModel} from '../../models/thumbnail.model';

export class ProjectThumbnailsStore {
  store = inject(ContentSignalStore);
  router = inject(Router);

  thumbnails: Signal<ThumbnailModel[]> = this.store.thumbnails;
  projects: Signal<ProjectModel[]> = this.store.projects;

  onThumbnailClick(id: string) {
    this.router.navigate(['/projects', id]);
  }
}
