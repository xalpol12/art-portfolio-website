import {Injectable} from '@angular/core';
import {ContentService, ProjectModel, ThumbnailModel} from '@ngx-artist-portfolio';
import {LocalStorageService} from './local-storage';
import {Observable, of, switchMap, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentStore {
  private memoryCache: Record<string, any> = {};

  constructor(private contentService: ContentService,
              private localStorageService: LocalStorageService) {}

  getThumbnails$(): Observable<ThumbnailModel[]> {
    return this.getContent<ThumbnailModel[]>('thumbnails', () => this.contentService.fetchThumbnails$());
  }

  getProjects$(): Observable<ProjectModel[]> {
    return this.getContent<ProjectModel[]>('projects', () => this.contentService.fetchProjects$());
  }

  getProjectById$(id: string): Observable<ProjectModel | undefined> {
    return this.getProjects$().pipe(
      switchMap(projects => of(projects.find(p => p.id === id)))
    );
  }

  private getContent<T>(key: string, fetchFn: () => Observable<T>): Observable<T> {
    // 1. Sprawdź cache w pamięci
    if (this.memoryCache[key] !== undefined) {
      return of(this.memoryCache[key] as T);
    }
    // 2. Sprawdź cache w localStorage
    return this.localStorageService.load<T>(key).pipe(
      switchMap(cached => {
        if (cached !== null) {
          this.memoryCache[key] = cached;
          return of(cached);
        }
        // 3. Pobierz z serwisu i zapisz do obu cache
        return fetchFn().pipe(
          tap(data => {
            this.memoryCache[key] = data;
            this.localStorageService.save<T>(key, data);
          })
        );
      })
    );
  }
}
