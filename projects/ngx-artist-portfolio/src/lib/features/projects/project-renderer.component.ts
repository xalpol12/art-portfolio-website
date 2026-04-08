import {Component, inject, Input, OnInit} from '@angular/core';
import {ContentType} from '../../models/content-type';
import {ProjectModel} from '../../models/project.model';
import {Paragraph} from '../../components/paragraph/paragraph';
import {GalleryGrid} from '../../components/gallery-grid/gallery-grid';
import {BreakComponent} from '../../components/break/break.component';
import {Image} from '../../components/image/image';
import {ImageLightbox} from '../../components/image-lightbox/image-lightbox';
import {LightboxService} from '../../services/lightbox.service';

@Component({
  selector: `apw-project-renderer`,
  template: `
    <div class="project-content">
      @for (block of project?.content; track $index) {
        @switch (block.type) {
          @case (ContentType.BREAK) {
            <apw-break></apw-break>
          }
          @case (ContentType.PARAGRAPH) {
            <apw-paragraph [content]="block.data"></apw-paragraph>
          }
          @case (ContentType.IMAGE) {
            <apw-img [image]="block.image"
                     [width]="block.width"
                     [height]="block.height"
                     (click)="lightbox.open(lightbox.getStartIndexFor(block, project!.content))"/>
          }
          @case (ContentType.GALLERY_GRID) {
            <apw-gallery-grid
              [data]="block"
              [startIndex]="lightbox.getStartIndexFor(block, project!.content)"
              (imageClicked)="lightbox.open($event)">
            </apw-gallery-grid>
          }
        }
      }
    </div>

    <apw-img-lightbox
      [isOpen]="lightbox.isOpen()"
      [currentIndex]="lightbox.currentIndex()"
      [images]="lightbox.images()"
      (closeOutput)="lightbox.close()"
      (indexChanged)="lightbox.goTo($event)">
    </apw-img-lightbox>
  `,
  standalone: true,
  imports: [Paragraph, GalleryGrid, BreakComponent, Image, ImageLightbox],
  providers: [LightboxService]
})
export class ProjectRendererComponent implements OnInit {

  @Input() project: ProjectModel | undefined;

  protected readonly lightbox = inject(LightboxService);
  protected readonly ContentType = ContentType;

  ngOnInit(): void {
    if (this.project?.content) {
      this.lightbox.loadImages(this.project.content);
    }
  }
}

