import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';
import {ParagraphConfig} from '../../models/project.model';

@Component({
  selector: `apw-paragraph`,
  template: `
    <p class="ngx-ap-body"
       [ngClass]="{'no-bottom-margin': config?.noBottomMargin}"
       [innerHTML]="content">
      <ng-content></ng-content>
    </p>`,
  standalone: true,
  styleUrl: 'paragraph.scss',
  imports: [NgClass]
})
export class Paragraph {
  @Input() content: string | undefined;
  @Input() config?: ParagraphConfig;
}
