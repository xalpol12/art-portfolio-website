import {ChangeDetectorRef, Component, computed, effect, inject, signal, Signal} from '@angular/core';
import {Thumbnail, ThumbnailModel} from '@ngx-artist-portfolio';
import {ProjectThumbnailsStore} from './project-thumbnails.store';
import {Store} from '../../store.service';

@Component({
  selector: `apw-random-project`,
  template: `
    @if (thumbnail()) {
      <apw-thumbnail class="ngx-center"
                     [thumbnail]="thumbnail()"
                     [paddingBottom]="false"
                     [isPriority]="true"
                     [constrainToViewport]="true"
                     (clicked)="projectThumbnailsStore.onThumbnailClick(thumbnail().id)"/>
    }
  `,
  standalone: true,
  imports: [
    Thumbnail
  ]
})
export class RandomProjectComponent {
  projectThumbnailsStore = new ProjectThumbnailsStore();
  cdr = inject(ChangeDetectorRef); // TODO fix random project refresh
  private readonly store = inject(Store);

  private readonly randomIndex = signal(Math.floor(Math.random() * 1000));

  thumbnail: Signal<ThumbnailModel> = computed(() => {
    const projects = this.projectThumbnailsStore.projects;
    const thumbnails = this.projectThumbnailsStore.thumbnails;
    const index = this.randomIndex() % projects().length;
    return thumbnails().find(t => t.id === projects()[index].id)!;
  });

  constructor() {
    effect(() => {
      this.store.homeClicks();
      this.rerollProject();
      this.cdr.markForCheck();
    });
  }

  rerollProject() {
    this.randomIndex.set(Math.floor(Math.random() * 1000));
  }
}
