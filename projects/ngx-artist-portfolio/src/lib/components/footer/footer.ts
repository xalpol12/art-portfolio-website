import {Component, inject} from '@angular/core';
import {Store} from '../../store.service';

@Component({
  selector: `apw-footer`,
  template: `
    <footer>
      <div class="contact">
        <div class="name">
          {{ store.config.name }}
        </div>
        @if (contacts.email; as email) {
          <div class="email">
            <a href="mailto:{{email}}">mail</a>
          </div>
        }
        @if (contacts.instagram; as ig) {
          <div class="instagram">
            <a href="https://www.instagram.com/{{ig}}" target="_blank">{{ '@' + ig }}</a>
          </div>
        }
      </div>
      <div class="creator">{{"Website by"}} <a href="https://www.instagram.com/stawido/" target="_blank">{{"@stawido"}}</a></div>
    </footer>
  `,
  styleUrl: './footer.scss',
  standalone: true
})
export class Footer {
  store = inject(Store);
  contacts = this.store.config.contact;
}
