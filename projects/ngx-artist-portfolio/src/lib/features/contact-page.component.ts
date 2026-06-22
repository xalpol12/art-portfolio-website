import {Component, inject} from '@angular/core';
import {TwitterIcon} from '../components/icons/twitter-icon';
import {FacebookIcon} from '../components/icons/facebook-icon';
import {EmailIcon} from '../components/icons/email-icon';
import {InstagramIcon} from '../components/icons/instagram-icon';
import {Store} from '../store.service';

@Component({
  selector: `apw-contact-page`,
  template: `
    <div class="ngx-page-padding ngx-center contact-list">
      @if (contact.email; as email) {
        <a class="contact-link" href="mailto:{{email}}" target="_blank">
          <apw-email-icon/>
          Email
        </a>
      }
      @if (contact.instagram; as ig) {
        <a class="contact-link" href="https://instagram.com/{{ig}}" target="_blank">
          <apw-instagram-icon/>
          Instagram
        </a>
      }
      @if (contact.facebook; as fb) {
        <a class="contact-link" href="https://facebook.com/{{fb}}" target="_blank">
          <apw-facebook-icon/>
          Facebook
        </a>
      }
      @if (contact.twitter; as tw) {
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
  store = inject(Store);
  contact = this.store.config.contact;
}
