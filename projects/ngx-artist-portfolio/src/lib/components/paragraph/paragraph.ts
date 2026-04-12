import {Component, Input, input, Signal} from '@angular/core';

@Component({
  selector: `apw-paragraph`,
  template: `<p class="ngx-ap-body" [innerHTML]="content"><ng-content></ng-content></p>`,
  standalone: true,
  styleUrl: 'paragraph.scss',
  imports: []
})
export class Paragraph {
  @Input() content: string | undefined;
}
