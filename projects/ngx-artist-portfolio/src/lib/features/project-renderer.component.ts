import {Component} from '@angular/core';

@Component({
  selector: `lib-project-renderer`,
  template: `
    <div class="project-content">
      @for (block of content; track $index) {
        @switch (block.type) {
          @case()
        }
      }
    </div>
  `,
  standalone: true,
  imports: []
})
export class ProjectRendererComponent {
  content: ProjectModel = signal()

}
