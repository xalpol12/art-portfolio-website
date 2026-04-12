import {Component} from '@angular/core';
import {RandomProjectComponent} from './projects/random-project.component';

@Component({
  selector: `apw-home-page`,
  template: `
    <div class="page-wrapper">
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

}
