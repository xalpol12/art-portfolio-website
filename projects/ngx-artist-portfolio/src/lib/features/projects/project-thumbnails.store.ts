import {inject, Injectable, Signal} from '@angular/core';
import {Router} from '@angular/router';
import {ContentSignalStore} from '../../services/content-signal-store.service';
import {ProjectModel} from '../../models/project.model';
import {ThumbnailModel} from '../../models/thumbnail.model';
import {Store} from '../../store.service';

@Injectable({providedIn: 'root'})
export class ProjectThumbnailsStore {
  store = inject(ContentSignalStore);
  router = inject(Router);
  private readonly portfolioStore = inject(Store);

  thumbnails: Signal<ThumbnailModel[]> = this.store.thumbnails;
  projects: Signal<ProjectModel[]> = this.store.projects;

  onThumbnailClick(id: string) {
    const projectDetailPath = this.portfolioStore.config.routes?.projectDetail
      ?? this.portfolioStore.config.routes?.projects
      ?? 'projects';
    this.router.navigate(['/' + projectDetailPath, id]);
  }
}
