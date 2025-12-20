import {Component, inject, OnInit} from '@angular/core';
import {ProjectRendererComponent} from './project-renderer.component';
import {ProjectModel} from '../../models/project.model';
import {Router} from '@angular/router';
import {ThumbnailModel} from '../../models/thumbnail.model';

@Component({
  selector: `apw-project-page`,
  template: `
    <div class="project-page">
      <div class="ngx-ap-h1">{{ thumbnail?.title }}</div>
      <apw-project-renderer [project]="project">
      </apw-project-renderer>
    </div>
  `,
  styleUrl: 'project.component.scss',
  standalone: true,
  imports: [ProjectRendererComponent]
})
export class ProjectComponent implements OnInit {
  thumbnail: ThumbnailModel | undefined;
  project: ProjectModel | undefined;

  private router = inject(Router);

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state || history.state;

    this.project = state?.['project'];
    this.thumbnail = state?.['thumbnail'];
  }
}
