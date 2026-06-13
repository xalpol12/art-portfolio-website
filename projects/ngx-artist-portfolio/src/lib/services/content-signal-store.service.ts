import {inject, Injectable, Signal, signal} from '@angular/core';
import {ContentService} from './content.service';
import {ProjectModel} from '../models/project.model';
import {ThumbnailModel} from '../models/thumbnail.model';

@Injectable({
  providedIn: 'root'
})
export class ContentSignalStore {
  private readonly contentService = inject(ContentService);

  readonly thumbnails: Signal<ThumbnailModel[]> = signal(this.contentService.getThumbnails());
  readonly projects: Signal<ProjectModel[]> = signal(this.contentService.getProjects());
  readonly bio: Signal<ProjectModel> = signal(this.contentService.getBio());

  getProjectById(id: string): ProjectModel | undefined {
    return this.projects().find(p => p.id === id);
  }

  getThumbnailById(id: string): ThumbnailModel | undefined {
    return this.thumbnails().find(t => t.id === id);
  }
}
