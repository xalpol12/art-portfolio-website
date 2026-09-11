import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ThumbnailModel} from '../../models/thumbnail.model';
import {ScrollToTopOnNavigationEndDirective} from '../../directives/scroll-to-top-on-navigation-end-directive';
import {Store} from '../../store.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: `apw-project-nav`,
  template: `
    @if (previous || next) {
      <nav class="project-nav" aria-label="Project navigation">
        @if (previous) {
          <a class="project-link align-left" [routerLink]="['/' + projectDetailPath, previous.id]" aria-label="Previous project" scrollToTopOnNavigationEnd>
            <svg class="project-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            <span class="project-link-label ngx-ap-small">{{ previousLabel }}</span>
          </a>
        }

        @if (next) {
          <a class="project-link align-right" [routerLink]="['/' + projectDetailPath, next.id]" aria-label="Next project" scrollToTopOnNavigationEnd>
            <span class="project-link-label ngx-ap-small">{{ nextLabel }}</span>
            <svg class="project-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        }
      </nav>
    }
  `,
  standalone: true,
  imports: [RouterLink, ScrollToTopOnNavigationEndDirective],
  styleUrl: 'project-nav.scss'
})
export class ProjectNav {
  @Input() previous: ThumbnailModel | undefined;
  @Input() next: ThumbnailModel | undefined;

  private readonly store = inject(Store);

  protected readonly projectDetailPath = this.store.config.routes?.projectDetail
    ?? this.store.config.routes?.projects
    ?? 'projects';
  protected readonly previousLabel = this.store.config.labels?.projectNav?.previous ?? 'Previous';
  protected readonly nextLabel = this.store.config.labels?.projectNav?.next ?? 'Next';
}




