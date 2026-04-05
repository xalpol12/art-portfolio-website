import {Injectable, Signal} from '@angular/core';
import {ContentService, ProjectModel, ThumbnailModel} from '@ngx-artist-portfolio';
import {LocalStorageService} from './local-storage';
import {Observable, of, switchMap, tap} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import {ContactModel} from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContentSignalStore {
  private memoryCache: Record<string, any> = {};

  constructor(private readonly contentService: ContentService,
              private readonly localStorageService: LocalStorageService) {
  }

  thumbnails(): Signal<ThumbnailModel[]> {
    return toSignal(this.getContent<ThumbnailModel[]>('thumbnails', () => this.contentService.fetchThumbnails$()), {initialValue: []});
  }

  projects(): Signal<ProjectModel[]> {
    return toSignal(this.getContent<ProjectModel[]>('projects', () => this.contentService.fetchProjects$()), {initialValue: []});
  }

  bio(): Signal<ProjectModel> {
    return toSignal(this.getContent<ProjectModel>('bio', () => this.contentService.fetchBio$()), {initialValue: {} as ProjectModel});
  }

  contact(): Signal<ContactModel> {
    return toSignal(this.getContent<ContactModel>('contact', () => this.contentService.fetchContact$()), {initialValue: {} as ContactModel});
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
