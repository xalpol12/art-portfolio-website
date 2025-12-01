import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private httpClient: HttpClient = inject(HttpClient);

  fetchContent():  {

  }

}
