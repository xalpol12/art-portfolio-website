import {Component, inject, OnInit} from '@angular/core';
import {ProjectRendererComponent} from './project-renderer.component';
import {ProjectModel, ThumbnailModel} from '../../models/project.model';
import {Router} from '@angular/router';

@Component({
  selector: `apw-project-page`, template: `
    <div>{{ thumbnail?.title }}</div>
    <apw-project-renderer [project]="project">
    </apw-project-renderer>
  `, standalone: true, imports: [ProjectRendererComponent]
})
export class ProjectPageComponent implements OnInit {
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
