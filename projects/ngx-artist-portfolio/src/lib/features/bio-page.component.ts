import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ProjectRendererComponent} from './projects/project-renderer.component';
import {ContentSignalStore} from '../services/content-signal-store.service';
import {SeoService} from '../services/seo.service';
import {Store} from '../store.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: `apw-bio-page`,
  template: `
    <div class="page-wrapper">
      <apw-project-renderer [project]="bio()"/>
    </div>
  `,
  standalone: true,
  styleUrl: 'bio-page.component.scss',
  imports: [
    ProjectRendererComponent
  ]
})
export class BioPageComponent {
  private readonly store = inject(ContentSignalStore);
  private readonly portfolioStore = inject(Store);
  private readonly seo = inject(SeoService);
  bio = this.store.bio;

  constructor() {
    const name = this.portfolioStore.config.name;
    this.seo.setPage({
      title: 'Bio',
      description: `About ${name}`,
      path: '/bio',
      type: 'profile',
    });
    this.seo.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name,
    });
  }
}
