import {inject, Injectable} from '@angular/core';
import {ProjectModel} from '../models/project.model';
import {ThumbnailModel} from '../models/thumbnail.model';
import {Store} from '../store.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private readonly store = inject(Store);
  private readonly data = this.store.config.data;

  getProjects(): ProjectModel[] {
    return this.data.projects;
  }

  getThumbnails(): ThumbnailModel[] {
    return this.data.thumbnails;
  }

  getBio(): ProjectModel {
    return this.data.bio;
  }
}
