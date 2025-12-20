import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: `apw-navbar`, template: `
    <nav class="navbar">
      <div class="title"><a routerLink="">{{ 'Artist Name' }}</a></div>
      <ul class="navigation">
        <li><a routerLink="projects" routerLinkActive="active">Gallery</a></li>
        <li><a routerLink="bio" routerLinkActive="active">Bio</a></li>
        <li><a routerLink="contact" routerLinkActive="active">Contact</a></li>
      </ul>
    </nav>
  `, styleUrl: './navbar.scss', standalone: true,
  imports: [RouterLink, RouterLinkActive]
})
export class Navbar {
  // TODO: make routerLink generic // configurable
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  constructor() {
    this.activatedRoute.data.subscribe(data => {

    })
  }

}
