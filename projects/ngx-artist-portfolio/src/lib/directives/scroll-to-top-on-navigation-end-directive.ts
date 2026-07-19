import {DestroyRef, Directive, HostListener, inject} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';

@Directive({
  selector: '[scrollToTopOnNavigationEnd]',
})
export class ScrollToTopOnNavigationEndDirective {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private shouldScrollOnNavigationEnd = false;

  constructor() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        if (!this.shouldScrollOnNavigationEnd) {
          return;
        }

        this.shouldScrollOnNavigationEnd = false;
        window.scrollTo({top: 0, behavior: 'smooth'});
      });
  }

  @HostListener('click')
  onClick(): void {
    this.shouldScrollOnNavigationEnd = true;
  }
}
