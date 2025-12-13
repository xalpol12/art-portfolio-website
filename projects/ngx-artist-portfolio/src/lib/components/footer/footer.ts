import {Component} from '@angular/core';

@Component({
  selector: `apw-footer`,
  template: `
    <footer>
      <div class="contact">
        <div class="name">
          {{'Artist Name'}}
        </div>
        <div class="email">
          <a href="mailto:mail@mail.com">mail</a>
        </div>
        <div class="instagram">
          <a href="https://www.instagram.com/artistprofile" target="_blank">{{"@artistprofile"}}</a>
        </div>
      </div>
      <div class="creator">{{"Website by"}} <a href="https://www.instagram.com/stawido/" target="_blank">{{"@stawido"}}</a></div>
    </footer>
  `,
  styleUrl: './footer.scss',
  standalone: true
})
export class Footer { }
