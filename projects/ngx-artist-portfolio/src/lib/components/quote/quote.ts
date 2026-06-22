import {Component, Input} from '@angular/core';

@Component({
  selector: `apw-quote`,
  template: `
    @if (text) {
      <figure class="quote-wrapper">
        <blockquote class="quote-text ngx-ap-body">{{ text }}</blockquote>
        @if (author || cite) {
          <figcaption class="quote-caption ngx-ap-small">
            @if (author) {
              <span class="quote-author">{{ author }}</span>
            }
            @if (cite) {
              <cite class="quote-cite">{{ cite }}</cite>
            }
          </figcaption>
        }
      </figure>
    }
  `,
  standalone: true,
  styleUrl: 'quote.scss'
})
export class Quote {
  @Input() text: string | undefined;
  @Input() author: string | undefined;
  @Input() cite: string | undefined;
}

