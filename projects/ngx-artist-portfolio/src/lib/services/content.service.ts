import {inject, Injectable, signal, Signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ContentModel, ProjectModel, ThumbnailModel} from '../models/project.model';
import {ContentType} from '../models/content-type';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private httpClient: HttpClient = inject(HttpClient);

 private THUMBNAILS: ThumbnailModel[] = [{
   id: 'project1',
   title: 'Sample Project 1',
   description: 'This is a description for Sample Project 1.',
   imageUrl: 'img/image.jpg'
 }, {
   id: 'project2',
   title: 'Sample Project 2 - deluxe edition',
   description: 'This is a description for Sample Project 2. It has a bit more text to see how it looks in the thumbnail component.',
   imageUrl: 'img/image.jpg'
 }, {
   id: 'project3',
   title: 'Sample Project 3: The Sequel',
   description: 'This is a description for Sample Project 3. It has a bit more text to see how it looks in the thumbnail component.',
   imageUrl: 'img/munch.jpg'
 }, {
   id: 'project4',
   title: 'Sample Project 4: The Extended Edition',
   description: 'This is a description for Sample Project 4. It contains a longer text to test text wrapping in the thumbnail component.',
   imageUrl: 'img/munch.jpg'
 }
 ];

  private CONTENT: ContentModel[] = [
    {
      type: ContentType.PARAGRAPH,
      data: 'This is a sample paragraph.'
    }, {
      type: ContentType.PARAGRAPH,
      data: 'This is a sample paragraph 2.'
    }, {
      type: ContentType.GALLERY_GRID,
      data: ''
    }
  ];

  private PROJECTS: ProjectModel[] = [
    {
      id: 'project1',
      content: this.CONTENT
    },
    {
      id: 'project2',
      content: this.CONTENT
    },
    {
      id: 'project3',
      content: this.CONTENT
    },
    {
      id: 'project4',
      content: this.CONTENT
    }
  ];

  fetchThumbnails(): Signal<ThumbnailModel[]>  {
    return signal(this.THUMBNAILS); // TODO: Caching
  }

  fetchProjects(): Signal<ProjectModel[]>  {
    return signal(this.PROJECTS);
  }

  fetchProjectById(id: string): Signal<ProjectModel | undefined>  {
    const project = this.PROJECTS.find(p => p.id === id);
    return signal(project);
  }

}
