import {inject, Injectable, signal, Signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ContentModel} from '../models/project.model';
import {ContentType} from '../models/content-type';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private httpClient: HttpClient = inject(HttpClient);

  CONTENT: ContentModel[] = [{
    type: ContentType.PARAGRAPH,
    data: 'This is a sample paragraph.'
  }, {
    type: ContentType.PARAGRAPH,
    data: 'This is a sample paragraph 2.'
  }];

  fetchContent(): Signal<ContentModel[]>  {
    return signal(this.CONTENT);
  }

}
