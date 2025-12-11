import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Footer, Navbar} from 'ngx-artist-portfolio';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  template: `
    <apw-navbar/>
    <router-outlet></router-outlet>
    <apw-footer/>
  `,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('showcase-app');
}
