import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProjectModel} from '../models/project.model';
import {Observable} from 'rxjs';
import {ThumbnailModel} from '../models/thumbnail.model';
import {ContactModel} from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private readonly httpClient: HttpClient = inject(HttpClient);

  fetchThumbnails$(): Observable<ThumbnailModel[]> {
    return this.httpClient.get<ThumbnailModel[]>('assets/data/thumbnails.json');
  }

  fetchProjects$(): Observable<ProjectModel[]> {
    return this.httpClient.get<ProjectModel[]>('assets/data/projects.json');
  }

  fetchBio$(): Observable<ProjectModel> {
    return this.httpClient.get<ProjectModel>('assets/data/bio.json');
  }

  fetchContact$(): Observable<ContactModel> {
    return this.httpClient.get<ContactModel>('assets/data/contact.json');
  }
}
