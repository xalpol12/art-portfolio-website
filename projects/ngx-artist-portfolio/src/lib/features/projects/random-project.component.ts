import {Component, OnInit} from '@angular/core';
import {ProjectModel, Thumbnail, ThumbnailModel} from '@ngx-artist-portfolio';
import {ProjectThumbnailsStore} from './project-thumbnails.store';

@Component({
  selector: `apw-random-project`,
  template: `
    @if (thumbnail) {
      <apw-thumbnail class="ngx-center"
                     [thumbnail]="thumbnail"
                     [paddingBottom]="false"
                     (clicked)="projectThumbnailsStore.onThumbnailClick(thumbnail.id)"
      />
    }
  `,
  standalone: true,
  imports: [
    Thumbnail
  ]
})
export class RandomProjectComponent implements OnInit {
  projectThumbnailsStore = new ProjectThumbnailsStore();

  thumbnails = this.projectThumbnailsStore.thumbnails;
  projects = this.projectThumbnailsStore.projects;

  project: ProjectModel = {} as ProjectModel;
  thumbnail: ThumbnailModel = {} as ThumbnailModel;

  ngOnInit(): void {
    const randomIndex = Math.floor(Math.random() * this.projects().length);
    this.project = this.projects()[randomIndex];
    this.thumbnail = this.thumbnails().find(t => t.id === this.project.id)!;
  }
}
