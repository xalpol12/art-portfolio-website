import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SeoService} from '../services/seo.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'apw-not-found-page',
  template: `
    <div class="ngx-page-padding ngx-center">
      <h1 class="ngx-ap-h1">Page not found</h1>
      <p class="ngx-ap-body">The page you're looking for doesn't exist.</p>
      <a routerLink="/">Back to home</a>
    </div>
  `,
  standalone: true,
  imports: [RouterLink],
})
export class NotFoundPageComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.setNoIndex();
  }
}
