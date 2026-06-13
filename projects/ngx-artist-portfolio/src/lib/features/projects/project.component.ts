import {Component, computed, inject, input} from '@angular/core';
import {ProjectRendererComponent} from './project-renderer.component';
import {ContentSignalStore} from '../../services/content-signal-store.service';

@Component({
  selector: `apw-project-page`,
  template: `
    <div class="page-wrapper">
      <div class="ngx-ap-h1">{{ thumbnail()?.title }}</div>
      <apw-project-renderer [project]="project()"/>
    </div>
  `,
  styleUrl: 'project.component.scss',
  standalone: true,
  imports: [ProjectRendererComponent]
})
export class ProjectComponent {
  /** Bound from route param :id via withComponentInputBinding() */
  id = input.required<string>();

  private readonly store = inject(ContentSignalStore);

  project = computed(() => this.store.getProjectById(this.id()));
  thumbnail = computed(() => this.store.getThumbnailById(this.id()));
}
