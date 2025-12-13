import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Navbar} from '../components/navbar/navbar';
import {Footer} from '../components/footer/footer';

@Component({
  selector: `apw-layout`,
  template: `
    <apw-navbar/>
    <main>
      <router-outlet/>
    </main>
    <apw-footer/>
  `,
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer]
})
export class LayoutComponent {

}
