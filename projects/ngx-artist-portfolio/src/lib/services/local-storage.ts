import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

interface LocalStorageItem {
  value: object;
  timestamp: number;
}
const EXPIRATION_TIME_MS = 5 * 60 * 1000; // 5 minutes

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private localStorage: Storage = window.localStorage;

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
      if (Date.now() - parsed.timestamp < EXPIRATION_TIME_MS) {
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
