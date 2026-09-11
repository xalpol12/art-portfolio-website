import {ChangeDetectionStrategy, Component, effect, inject, input} from '@angular/core';
import {NgComponentOutlet} from '@angular/common';
import {ContentType} from '../../models/content-type';
import {ContentModel, ProjectContentBlock, ProjectModel} from '../../models/project.model';
import {Paragraph} from '../../components/paragraph/paragraph';
import {GalleryGrid} from '../../components/gallery-grid/gallery-grid';
import {BreakComponent} from '../../components/break/break.component';
import {Image} from '../../components/image/image';
import {ImageLightbox} from '../../components/image-lightbox/image-lightbox';
import {LightboxService} from '../../services/lightbox.service';
import {Quote} from '../../components/quote/quote';
import {Video} from '../../components/video/video';
import {LinkComponent} from '../../components/link/link';
import {stripHtml} from '../../utils/strip-html';
import {CONTENT_BLOCK_EXTENSIONS} from '../../content-block-extensions.token';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: `apw-project-renderer`,
  template: `
    <div class="project-content">
      @for (block of project()?.content; track block) {
        @if (isBuiltIn(block)) {
          @switch (block.type) {
            @case (ContentType.BREAK) {
              <apw-break></apw-break>
            }
            @case (ContentType.PARAGRAPH) {
              <apw-paragraph [content]="block.data" [config]="block.config"></apw-paragraph>
            }
            @case (ContentType.QUOTE) {
              <apw-quote [text]="block.text" [author]="block.author" [cite]="block.cite"></apw-quote>
            }
            @case (ContentType.IMAGE) {
              <apw-img [image]="block.image"
                       [width]="block.width"
                       [height]="block.height"
                       [alt]="imageAlt(block.description)"
                       [description]="block.description"
                       (click)="lightbox.open(lightbox.getStartIndexFor(block, project()!.content), $event.currentTarget)"/>
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
            @case (ContentType.LINK) {
              <apw-link
                [text]="block.data.text"
                [link]="block.data.link"
              ></apw-link>
            }
          }
        } @else {
          @if (extensionFor(block.type); as extensionComponent) {
            <ng-container *ngComponentOutlet="extensionComponent; inputs: {block: block}"></ng-container>
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
  imports: [Paragraph, GalleryGrid, BreakComponent, Image, ImageLightbox, Quote, Video, LinkComponent, NgComponentOutlet],
  providers: [LightboxService]
})
export class ProjectRendererComponent {

  readonly project = input<ProjectModel | undefined>();

  protected readonly lightbox = inject(LightboxService);
  protected readonly ContentType = ContentType;
  private readonly extensions = inject(CONTENT_BLOCK_EXTENSIONS);

  protected imageAlt(description?: { title?: string }): string {
    return description?.title ? stripHtml(description.title) : '';
  }

  protected extensionFor(type: string) {
    return this.extensions.find(extension => extension.type === type)?.component;
  }

  protected isBuiltIn(block: ProjectContentBlock): block is ContentModel {
    return (Object.values(ContentType) as string[]).includes(block.type);
  }

  constructor() {
    effect(() => {
      const content = this.project()?.content;
      this.lightbox.loadImages(content ?? []);
    });
  }
}

