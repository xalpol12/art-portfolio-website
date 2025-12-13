import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Navbar} from '../components/navbar/navbar';
import {Footer} from '../components/footer/footer';

@Component({
  selector: `apw-layout`,
  template: `
    <div class="ngx-artist-portfolio-root ngx-artist-portfolio-theme">
      <apw-navbar/>
      <main>
        <router-outlet/>
      </main>
      <apw-footer/>
    </div>
  `,
  standalone: true,
  styleUrl: './layout.component.ts',
  imports: [RouterOutlet, Navbar, Footer]
})
export class LayoutComponent {

}
