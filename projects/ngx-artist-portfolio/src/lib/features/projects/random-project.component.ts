import {ChangeDetectionStrategy, Component, effect, inject, signal, Signal, untracked} from '@angular/core';
import {ThumbnailModel} from '../../models/thumbnail.model';
import {Thumbnail} from '../../components/thumbnail/thumbnail';
import {ProjectThumbnailsStore} from './project-thumbnails.store';
import {Store} from '../../store.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: `apw-random-project`,
  template: `
    @if (thumbnail(); as t) {
      <apw-thumbnail class="ngx-center"
                     [thumbnail]="t"
                     [paddingBottom]="false"
                     [isPriority]="true"
                     [constrainToViewport]="true"
                     (clicked)="projectThumbnailsStore.onThumbnailClick(t.id)"/>
    }
  `,
  standalone: true,
  imports: [
    Thumbnail
  ]
})
export class RandomProjectComponent {
  projectThumbnailsStore = inject(ProjectThumbnailsStore);
  private readonly store = inject(Store);

  private readonly _thumbnail = signal<ThumbnailModel | undefined>(undefined);
  protected readonly thumbnail: Signal<ThumbnailModel | undefined> = this._thumbnail.asReadonly();

  constructor() {
    effect(() => {
      this.store.homeClicks();
      const projects = this.projectThumbnailsStore.projects();
      const thumbnails = this.projectThumbnailsStore.thumbnails();

      if (projects.length === 0) {
        this._thumbnail.set(undefined);
        return;
      }

      const lastId = untracked(() => this.store.lastRandomProjectId());
      const candidates = projects.length > 1 ? projects.filter(p => p.id !== lastId) : projects;
      const chosen = candidates[Math.floor(Math.random() * candidates.length)];

      this.store.lastRandomProjectId.set(chosen.id);
      this._thumbnail.set(thumbnails.find(t => t.id === chosen.id));
    });
  }
}
