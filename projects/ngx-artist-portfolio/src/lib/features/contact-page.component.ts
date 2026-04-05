import {Component, inject} from '@angular/core';
import {ContentSignalStore} from '../services/content-signal-store.service';
import {EmailIcon, FacebookIcon, InstagramIcon, TwitterIcon} from '@ngx-artist-portfolio';

@Component({
  selector: `apw-contact-page`,
  template: `
    <div class="ngx-page-padding ngx-center contact-list">
      @if (contacts().email; as email) {
        <a class="contact-link" href="mailto:{{email}}" target="_blank">
          <apw-email-icon/>
          Email
        </a>
      }
      @if (contacts().instagram; as ig) {
        <a class="contact-link" href="https://instagram.com/{{ig}}" target="_blank">
          <apw-instagram-icon/>
          Instagram
        </a>
      }
      @if (contacts().facebook; as fb) {
        <a class="contact-link" href="https://facebook.com/{{fb}}" target="_blank">
          <apw-facebook-icon/>
          Facebook
        </a>
      }
      @if (contacts().twitter; as tw) {
        <a class="contact-link" href="https://twitter.com/{{tw}}" target="_blank">
          <apw-twitter-icon/>
          Twitter
        </a>
      }
    </div>
  `,
  standalone: true,
  imports: [EmailIcon, InstagramIcon, FacebookIcon, TwitterIcon],
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent {
  store = inject(ContentSignalStore);

  contacts = this.store.contact();

}
