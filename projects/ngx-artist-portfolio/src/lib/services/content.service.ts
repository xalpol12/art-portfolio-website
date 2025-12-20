import {inject, Injectable, Signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProjectModel} from '../models/project.model';
import {toSignal} from '@angular/core/rxjs-interop';
import {map, Observable} from 'rxjs';
import {ThumbnailModel} from '../models/thumbnail.model';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private httpClient: HttpClient = inject(HttpClient);

  fetchThumbnails$(): Observable<ThumbnailModel[]> {
    return this.httpClient.get<ThumbnailModel[]>('assets/data/thumbnails.json');
    // TODO: Caching
  }

  fetchProjects$(): Observable<ProjectModel[]> {
    return this.httpClient.get<ProjectModel[]>('assets/data/projects.json');
  }

  fetchProjectById$(id: string): Observable<ProjectModel | undefined> {
    return this.httpClient.get<ProjectModel[]>('assets/data/projects.json').pipe(map(projects => projects.find(p => p.id === id)));
  }

}
