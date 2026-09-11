import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RandomProjectComponent} from './projects/random-project.component';
import {SeoService} from '../services/seo.service';
import {Store} from '../store.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: `apw-home-page`,
  template: `
    <div class="ngx-page-padding-sides-only">
      <apw-random-project/>
    </div>
  `,
  styleUrl: './home-page.component.scss',
  standalone: true,
  imports: [
    RandomProjectComponent
  ]
})
export class HomePageComponent {
  private readonly seo = inject(SeoService);
  private readonly store = inject(Store);

  constructor() {
    const config = this.store.config;
    this.seo.setPage({
      title: config.siteTitle ?? config.name,
      description: `Portfolio of ${config.name}`,
      path: '/',
      suffixSiteName: false,
    });
  }
}
