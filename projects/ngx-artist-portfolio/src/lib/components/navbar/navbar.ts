import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive} from '@angular/router';
import {Store} from '../../store.service';

@Component({
  selector: `apw-navbar`, template: `
    <nav class="navbar">
      <div class="title"><a routerLink="" (click)="store.onHomeClick()">{{ store.config.name }}</a></div>
      <button class="hamburger" [class.open]="menuOpen()" (click)="toggleMenu()" aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul class="navigation" [class.open]="menuOpen()">
        <li><a routerLink="projects"
               routerLinkActive="active"
               [routerLinkActiveOptions]="{exact: false}"
               (click)="closeMenu()">Galeria</a></li>
        <li><a routerLink="bio" routerLinkActive="active" (click)="closeMenu()">Bio</a></li>
        <li><a routerLink="contact" routerLinkActive="active" (click)="closeMenu()">Kontakt</a></li>
      </ul>
    </nav>
  `, styleUrl: './navbar.scss', standalone: true,
  imports: [RouterLink, RouterLinkActive]
})
export class Navbar {
  // TODO: make routerLink generic // configurable
  store = inject(Store);
  menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
