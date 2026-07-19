import {Component, computed, inject, input} from '@angular/core';
import {ProjectRendererComponent} from './project-renderer.component';
import {ContentSignalStore} from '../../services/content-signal-store.service';
import {ProjectNav} from '../../components/project-nav/project-nav';

@Component({
  selector: `apw-project-page`,
  template: `
    <div class="page-wrapper">
      <div class="ngx-ap-h1" [innerHtml]="thumbnail()?.title"></div>
      <apw-project-renderer [project]="project()"/>
      <apw-project-nav [previous]="previousThumbnail()" [next]="nextThumbnail()" />
    </div>
  `,
  styleUrl: 'project.component.scss',
  standalone: true,
  imports: [ProjectRendererComponent, ProjectNav]
})
export class ProjectComponent {
  /** Bound from route param :id via withComponentInputBinding() */
  id = input.required<string>();

  private readonly store = inject(ContentSignalStore);

  project = computed(() => this.store.getProjectById(this.id()));
  thumbnail = computed(() => this.store.getThumbnailById(this.id()));

  private adjacentProjectIds = computed(() => this.store.getAdjacentProjectIds(this.id()));
  previousThumbnail = computed(() => {
    const previousId = this.adjacentProjectIds().prev;
    return previousId ? this.store.getThumbnailById(previousId) : undefined;
  });
  nextThumbnail = computed(() => {
    const nextId = this.adjacentProjectIds().next;
    return nextId ? this.store.getThumbnailById(nextId) : undefined;
  });
}
