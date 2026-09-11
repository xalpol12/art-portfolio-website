import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TwitterIcon} from '../components/icons/twitter-icon';
import {FacebookIcon} from '../components/icons/facebook-icon';
import {EmailIcon} from '../components/icons/email-icon';
import {InstagramIcon} from '../components/icons/instagram-icon';
import {Store} from '../store.service';
import {SeoService} from '../services/seo.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: `apw-contact-page`,
  template: `
    <div class="page-wrapper">
      <h1 class="ngx-ap-h1">{{ heading }}</h1>
      <div class="contact-grid">
        @if (contact.email; as email) {
          <a class="contact-tile" href="mailto:{{email}}" target="_blank" rel="noopener noreferrer">
            <apw-email-icon/>
            <span>Email</span>
          </a>
        }
        @if (contact.instagram; as ig) {
          <a class="contact-tile" href="https://instagram.com/{{ig}}" target="_blank" rel="noopener noreferrer">
            <apw-instagram-icon/>
            <span>Instagram</span>
          </a>
        }
        @if (contact.facebook; as fb) {
          <a class="contact-tile" href="https://facebook.com/{{fb}}" target="_blank" rel="noopener noreferrer">
            <apw-facebook-icon/>
            <span>Facebook</span>
          </a>
        }
        @if (contact.twitter; as tw) {
          <a class="contact-tile" href="https://twitter.com/{{tw}}" target="_blank" rel="noopener noreferrer">
            <apw-twitter-icon/>
            <span>Twitter</span>
          </a>
        }
      </div>
    </div>
  `,
  standalone: true,
  imports: [EmailIcon, InstagramIcon, FacebookIcon, TwitterIcon],
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent {
  store = inject(Store);
  private readonly seo = inject(SeoService);
  contact = this.store.config.contact;
  protected readonly heading = this.store.config.labels?.nav?.contact ?? 'Contact';

  constructor() {
    this.seo.setPage({
      title: this.heading,
      description: `Get in touch with ${this.store.config.name}`,
      path: '/contact',
    });
  }
}
