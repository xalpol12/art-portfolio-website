import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Store} from '../../store.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: `apw-footer`,
  template: `
    <footer>
      <div class="contact">
        <div class="name">
          {{ store.config.name }}
        </div>
        @if (contacts.instagram; as ig) {
          <div class="instagram">
            <a href="https://www.instagram.com/{{ig}}" target="_blank" rel="noopener noreferrer">{{ '@' + ig }}</a>
          </div>
        }
      </div>
      <div class="creator">{{ creditText }} <a [href]="creditUrl" target="_blank" rel="noopener noreferrer">{{ creditName }}</a></div>
    </footer>
  `,
  styleUrl: './footer.scss',
  standalone: true
})
export class Footer {
  store = inject(Store);
  contacts = this.store.config.contact;

  protected readonly creditText = this.store.config.labels?.footer?.creditText ?? 'Website by';
  protected readonly creditName = this.store.config.labels?.footer?.creditName ?? '@xalpol12';
  protected readonly creditUrl = this.store.config.labels?.footer?.creditUrl ?? 'https://github.com/xalpol12';
}
