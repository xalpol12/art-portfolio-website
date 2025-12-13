import {Component, Input} from '@angular/core';
import {ProjectModel} from '../../models/project.model';
import {ContentType} from '../../models/content-type';
import {Paragraph} from '../../components/paragraph/paragraph';
import {GalleryGrid} from '../../components/gallery-grid/gallery-grid';

@Component({
  selector: `apw-project-renderer`, template: `
    <div class="project-content">
      @for (block of project?.content; track $index) {
        @switch (block.type) {
          @case (ContentType.PARAGRAPH) {
            <apw-paragraph>
              <p>{{ block.data }}</p>
            </apw-paragraph>
          }
          @case (ContentType.GALLERY_GRID) {
            <apw-gallery-grid>
            </apw-gallery-grid>
          }
        }
      }
    </div>
  `, standalone: true, imports: [Paragraph, GalleryGrid]
})
export class ProjectRendererComponent {

  @Input() project: ProjectModel | undefined;

  protected readonly ContentType = ContentType;
}
