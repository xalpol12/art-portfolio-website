import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive} from '@angular/router';
import {Store} from '../../store.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: `apw-navbar`, template: `
    <nav class="navbar ngx-ap-body">
      <div class="title"><a routerLink="" (click)="store.onHomeClick()">{{ store.config.name }}</a></div>
      <button class="hamburger" [class.open]="menuOpen()" (click)="toggleMenu()" aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul class="navigation" [class.open]="menuOpen()">
        <li><a [routerLink]="projectsPath"
               routerLinkActive="active"
               [routerLinkActiveOptions]="{exact: false}"
               (click)="closeMenu()">{{ projectsLabel }}</a></li>
        <li><a [routerLink]="bioPath" routerLinkActive="active" (click)="closeMenu()">{{ bioLabel }}</a></li>
        <li><a [routerLink]="contactPath" routerLinkActive="active" (click)="closeMenu()">{{ contactLabel }}</a></li>
      </ul>
    </nav>
  `, styleUrl: './navbar.scss', standalone: true,
  imports: [RouterLink, RouterLinkActive]
})
export class Navbar {
  store = inject(Store);
  menuOpen = signal(false);

  protected readonly projectsPath = this.store.config.routes?.projects ?? 'projects';
  protected readonly bioPath = this.store.config.routes?.bio ?? 'bio';
  protected readonly contactPath = this.store.config.routes?.contact ?? 'contact';

  protected readonly projectsLabel = this.store.config.labels?.nav?.projects ?? 'Projects';
  protected readonly bioLabel = this.store.config.labels?.nav?.bio ?? 'Bio';
  protected readonly contactLabel = this.store.config.labels?.nav?.contact ?? 'Contact';

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
