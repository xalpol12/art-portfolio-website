import {Component} from '@angular/core';

@Component({
  selector: `apw-navbar`,
  template: `
    <nav class="navbar">
      <div class="left">
        <div class="title">{{'Artist Name'}}</div>
        <ul class="navigation">
          <li>Gallery</li>
          <li>Bio</li>
          <li>Contact</li>
        </ul>
      </div>
      <div class="right">
        <div class="social">
          <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            Insta
          </a>
        </div>
      </div>
    </nav>
  `,
  styleUrl: './navbar.scss',
  standalone: true
})
export class Navbar { }
