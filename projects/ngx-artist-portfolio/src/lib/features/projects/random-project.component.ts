import {ChangeDetectionStrategy, Component, computed, effect, inject, signal, Signal, untracked} from '@angular/core';
import {ThumbnailModel} from '../../models/thumbnail.model';
import {Thumbnail} from '../../components/thumbnail/thumbnail';
import {ProjectThumbnailsStore} from './project-thumbnails.store';
import {Store} from '../../store.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: `apw-random-project`,
  template: `
    @for (t of [thumbnail()]; track t.id) {
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
  projectThumbnailsStore = new ProjectThumbnailsStore();
  private readonly store = inject(Store);

  private readonly seeds = Array.from({length: 1000}, () => Math.floor(Math.random() * 10000));

  thumbnail: Signal<ThumbnailModel> = computed(() => {
    const projects = this.projectThumbnailsStore.projects();
    const thumbnails = this.projectThumbnailsStore.thumbnails();
    const clickCount = this.store.homeClicks();
    const count = projects.length;

    const prevSeed = this.seeds[(clickCount - 1 + this.seeds.length) % this.seeds.length];
    const currentIndex = count > 0 ? prevSeed % count : 0;

    const seed = this.seeds[clickCount % this.seeds.length];
    let nextIndex = seed % Math.max(count - 1, 1);
    if (nextIndex >= currentIndex) nextIndex++;

    const safeIndex = count > 0 ? nextIndex % count : 0;
    return thumbnails.find(t => t.id === projects[safeIndex].id)!;
  });
}
