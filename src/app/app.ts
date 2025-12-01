import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Navbar} from './shared/ui/navbar/navbar';

@Component({
  selector: 'app-root', template: `
    <div class="container">
      <apw-navbar/>
      <router-outlet></router-outlet>
      <apw-navbar/>
    </div>
  `, styleUrl: './app.scss', imports: [RouterOutlet, Navbar], standalone: true
})
export class App {
  protected readonly title = signal('art-portfolio');
}
