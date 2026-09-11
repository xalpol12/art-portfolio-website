import {ChangeDetectionStrategy, Component, computed, effect, inject, input} from '@angular/core';
import {ProjectRendererComponent} from './project-renderer.component';
import {ContentSignalStore} from '../../services/content-signal-store.service';
import {ProjectNav} from '../../components/project-nav/project-nav';
import {SeoService} from '../../services/seo.service';
import {ContentType} from '../../models/content-type';
import {GalleryGridModel, ImageModel} from '../../models/project.model';
import {stripHtml} from '../../utils/strip-html';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: `apw-project-page`,
  template: `
    <div class="page-wrapper">
      <h1 class="ngx-ap-h1" [innerHTML]="thumbnail()?.title"></h1>
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
  private readonly seo = inject(SeoService);

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

  constructor() {
    effect(() => {
      const thumbnail = this.thumbnail();
      if (!thumbnail) {
        return;
      }
      this.seo.setProjectSeo(thumbnail, `/projects/${thumbnail.id}`);

      const artworkBlock = this.project()?.content.find(
        (block): block is ImageModel | GalleryGridModel =>
          (block.type === ContentType.IMAGE || block.type === ContentType.GALLERY_GRID) && !!block.description
      );
      const description = artworkBlock?.description;

      this.seo.setJsonLd({
        '@context': 'https://schema.org',
        '@type': 'VisualArtwork',
        name: stripHtml(thumbnail.title),
        image: thumbnail.imageUrl,
        ...(description?.medium ? {artMedium: description.medium} : {}),
        ...(description?.size ? {size: description.size} : {}),
        ...(description?.year ? {dateCreated: description.year} : {}),
      });
    });
  }
}
