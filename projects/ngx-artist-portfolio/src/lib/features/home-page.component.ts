import {Component} from '@angular/core';
import {RandomProjectComponent} from './projects/random-project.component';

@Component({
  selector: `apw-home-page`,
  template: `
      <apw-random-project/>
  `,
  styleUrl: './home-page.component.scss',
  standalone: true,
  imports: [
    RandomProjectComponent
  ]
})
export class HomePageComponent {

}
