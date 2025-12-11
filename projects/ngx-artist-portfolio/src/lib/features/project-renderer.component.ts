import {Component, signal} from '@angular/core';
import {ContentModel} from '../models/project.model';
import {ContentType} from '../models/content-type';
import {Paragraph} from '../components/paragraph/paragraph';

@Component({
  selector: `awp-project-renderer`,
  template: `
    <div class="project-content">
      @for (block of CONTENT; track $index) {
        @switch (block.type) {
          @case(ContentType.PARAGRAPH) {
            <apw-paragraph>
              <p>{{block.data}}</p>
            </apw-paragraph>
          }
        }
      }
    </div>
  `,
  standalone: true,
  imports: [
    Paragraph
  ]
})
export class ProjectRendererComponent {

  // protected content = signal<ContentModel[]>(this.CONTENT);

  protected readonly ContentType = ContentType;
}
