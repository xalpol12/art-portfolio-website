import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: `apw-navbar`, template: `
    <nav class="navbar">
      <div class="title"><a routerLink="">{{ 'Artist Name' }}</a></div>
      <ul class="navigation">
        <li><a routerLink="projects">Gallery</a></li>
        <li><a routerLink="bio">Bio</a></li>
        <li><a routerLink="contact">Contact</a></li>
      </ul>
    </nav>
  `, styleUrl: './navbar.scss', standalone: true,
  imports: [RouterLink]
})
export class Navbar {
  // TODO: make routerLink generic // configurable
}
