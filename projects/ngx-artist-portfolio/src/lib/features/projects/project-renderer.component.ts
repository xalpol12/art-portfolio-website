import {Component, effect, inject, input} from '@angular/core';
import {ContentType} from '../../models/content-type';
import {ProjectModel} from '../../models/project.model';
import {Paragraph} from '../../components/paragraph/paragraph';
import {GalleryGrid} from '../../components/gallery-grid/gallery-grid';
import {BreakComponent} from '../../components/break/break.component';
import {Image} from '../../components/image/image';
import {ImageLightbox} from '../../components/image-lightbox/image-lightbox';
import {LightboxService} from '../../services/lightbox.service';
import {Quote} from '../../components/quote/quote';
import {Video} from '../../components/video/video';

@Component({
  selector: `apw-project-renderer`,
  template: `
    <div class="project-content">
      @for (block of project()?.content; track block) {
        @switch (block.type) {
          @case (ContentType.BREAK) {
            <apw-break></apw-break>
          }
          @case (ContentType.PARAGRAPH) {
            <apw-paragraph [content]="block.data"></apw-paragraph>
          }
          @case (ContentType.QUOTE) {
            <apw-quote [text]="block.text" [author]="block.author" [cite]="block.cite"></apw-quote>
          }
          @case (ContentType.IMAGE) {
            <apw-img [image]="block.image"
                     [width]="block.width"
                     [height]="block.height"
                     [description]="block.description"
                     (click)="lightbox.open(lightbox.getStartIndexFor(block, project()!.content))"/>
          }
          @case (ContentType.GALLERY_GRID) {
            <apw-gallery-grid
              [data]="block"
              [startIndex]="lightbox.getStartIndexFor(block, project()!.content)"
              (imageClicked)="lightbox.open($event)">
            </apw-gallery-grid>
          }
          @case (ContentType.VIDEO) {
            <apw-video
              [src]="block.src"
              [provider]="block.provider"
              [poster]="block.poster"
              [title]="block.title"
              [aspectRatio]="block.aspectRatio"
              [controls]="block.controls ?? true"
              [autoplay]="block.autoplay ?? false"
              [loop]="block.loop ?? false"
              [muted]="block.muted ?? false">
            </apw-video>
          }
        }
      }
    </div>

    <apw-img-lightbox
      [isOpen]="lightbox.isOpen()"
      [currentIndex]="lightbox.currentIndex()"
      [images]="lightbox.images()"
      [zoomDisabled]="lightbox.zoomDisabled()"
      (closeOutput)="lightbox.close()"
      (indexChanged)="lightbox.goTo($event)">
    </apw-img-lightbox>
  `,
  standalone: true,
  imports: [Paragraph, GalleryGrid, BreakComponent, Image, ImageLightbox, Quote, Video],
  providers: [LightboxService]
})
export class ProjectRendererComponent {

  readonly project = input<ProjectModel | undefined>();

  protected readonly lightbox = inject(LightboxService);
  protected readonly ContentType = ContentType;

  constructor() {
    effect(() => {
      const content = this.project()?.content;
      this.lightbox.loadImages(content ?? []);
    });
  }
}

