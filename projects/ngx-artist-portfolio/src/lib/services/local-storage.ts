import {inject, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Store} from '../store.service';

interface LocalStorageItem {
  value: object;
  timestamp: number;
}
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly store = inject(Store);
  private readonly localStorage: Storage = globalThis.localStorage;
  private readonly expirationTimeMs = this.store.config.cacheExpirationTimeMs;

  save<T>(key: string, value: T): void {
    this.localStorage.setItem(key, JSON.stringify({
      value,
      timestamp: Date.now()
    }));
  }

  load<T>(key: string): Observable<T | null> {
    const item = this.localStorage.getItem(key);
    if (!item) {
      return of(null);
    }
    try {
      const parsed: LocalStorageItem = JSON.parse(item);
      if (Date.now() - parsed.timestamp < this.expirationTimeMs) {
        return of(parsed.value as T);
      } else {
        this.localStorage.removeItem(key);
        return of(null);
      }
    } catch (e) {
      console.error('Failed to parse local storage item', e);
      return of(null);
    }
  }
}
