import {Component, Input, OnInit} from '@angular/core';
import {ProjectModel} from '../../models/project.model';
import {ContentType} from '../../models/content-type';
import {Paragraph} from '../../components/paragraph/paragraph';
import {GalleryGrid} from '../../components/gallery-grid/gallery-grid';
import {BreakComponent} from '../../components/break/break.component';
import {Image} from '../../components/image/image';

@Component({
  selector: `apw-project-renderer`, template: `
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
            <apw-img [image]="block.image"/>
          }
          @case (ContentType.GALLERY_GRID) {
            <apw-gallery-grid [data]="block">
            </apw-gallery-grid>
          }
        }
      }
    </div>
  `, standalone: true, imports: [Paragraph, GalleryGrid, BreakComponent, Image]
})
export class ProjectRendererComponent implements OnInit {

  @Input() project: ProjectModel | undefined;

  ngOnInit() {
    console.error(JSON.stringify(this.project));
  }

  protected readonly ContentType = ContentType;
}
