import {Component, inject} from '@angular/core';
import {ProjectRendererComponent} from './projects/project-renderer.component';
import {ContentSignalStore} from '../services/content-signal-store.service';

@Component({
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
  bio = this.store.bio();

}
