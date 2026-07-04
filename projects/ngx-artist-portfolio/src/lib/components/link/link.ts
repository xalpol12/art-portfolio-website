import {Component, Input} from '@angular/core';

@Component({
  selector: `apw-link`,
  template: `
    <div class="ngx-ap-body">
      <a class="link" [href]="link" target="_blank" rel="noopener noreferrer">{{ text }}</a>
    </div>
  `,
  standalone: true,
  styleUrl: 'link.scss',
  imports: []
})
export class LinkComponent {
  @Input() text: string | undefined;
  @Input() link: string | undefined;
}
