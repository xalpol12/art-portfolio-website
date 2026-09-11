import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Navbar} from '../components/navbar/navbar';
import {Footer} from '../components/footer/footer';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: `apw-layout`,
  template: `
    <div class="ngx-artist-portfolio-root ngx-artist-portfolio-theme">
      <apw-navbar/>
      <main class="ngx-artist-portfolio-full-height">
        <router-outlet/>
      </main>
      <apw-footer/>
    </div>
  `,
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer]
})
export class LayoutComponent {

}
