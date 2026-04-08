import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProjectModel} from '../models/project.model';
import {Observable} from 'rxjs';
import {ThumbnailModel} from '../models/thumbnail.model';
import {Store} from '../store.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private readonly store = inject(Store);
  private readonly httpClient: HttpClient = inject(HttpClient);

  private readonly apiUrl = this.store.config.contentApiUrl;

  fetchThumbnails$(): Observable<ThumbnailModel[]> {
    return this.httpClient.get<ThumbnailModel[]>(this.apiUrl + '/thumbnails.json');
  }

  fetchProjects$(): Observable<ProjectModel[]> {
    return this.httpClient.get<ProjectModel[]>(this.apiUrl + '/projects.json');
  }

  fetchBio$(): Observable<ProjectModel> {
    return this.httpClient.get<ProjectModel>(this.apiUrl + 'assets/data/bio.json');
  }
}
