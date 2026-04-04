import {Component, computed, HostListener, input, Input, output} from '@angular/core';
import {ArtworkDescriptionPipe} from '../../pipes/artwork-description-pipe';
import {ImageDescriptionModel} from '@ngx-artist-portfolio';
import {Image} from '../image/image';

@Component({
  selector: `apw-img-lightbox`, template: `
    @if (isOpen) {
      <div class="modal"
           (click)="onBackdropClick($event)"
           (touchstart)="onTouchStart($event)"
           (touchend)="onTouchEnd()"
           (touchmove)="onTouchMove($event)">
        <span class="close" (click)="closeModal()">&times;</span>
        <div class="modal-content">
          <apw-img [image]="currentImage()" [alt]="currentAlt()"></apw-img>
        </div>

        @if (images && images.length > 1) {
          <a class="prev" (click)="nextSlide(-1)">&#10094;</a>
          <a class="next" (click)="nextSlide(1)">&#10095;</a>
          <div class="image-counter">{{currentIndex + 1}} / {{images.length}}</div>
        }
      </div>
    }
  `, standalone: true, imports: [
    Image
  ], styleUrl: 'image-lightbox.scss'
})
export class ImageLightbox {
  images = input<string[]>([]);
  currentIndex = input<number>(0);
  isOpen = input<boolean>(false);

  close = output<void>();
  indexChanged = output<number>();

  private touchStartX: number = 0;
  private touchEndX: number = 0;
  private readonly SWIPE_THRESHOLD = 50;

  currentImage = computed(() => {
    const imgs = this.images();
    const idx = this.currentIndex();
    return imgs[idx] || '';
  })

  currentAlt = computed(() => {
    const idx = this.currentIndex();
    const total = this.images().length;
    return `Image ${idx + 1} of ${total}`;
  })

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (!this.isOpen()) return;

    switch (event.key) {
      case 'Escape':
        this.closeModal();
        break;
      case 'ArrowLeft':
        this.nextSlide(-1);
        event.preventDefault();
        break;
      case 'ArrowRight':
        this.nextSlide(1);
        event.preventDefault();
        break;
    }
  }

  closeModal(): void {
    this.close.emit();
  }

  nextSlide(step: number) {
    const imgs = this.images();
    if (!imgs || imgs.length === 0) return;

    const currentIndex = this.currentIndex();
    const total = this.images().length;
    const newIndex = (currentIndex + step + total) % total;
    this.indexChanged.emit(newIndex);
  }

  onBackdropClick(event: MouseEvent) {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.closeModal();
    }
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchMove(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;

  }

  onTouchEnd(): void {
    const swipeDistance = this.touchStartX - this.touchEndX;

    if (Math.abs(swipeDistance) > this.SWIPE_THRESHOLD) {
      if (swipeDistance > 0) {
        this.nextSlide(1);
      } else {
        this.nextSlide(-1);
      }
    }
    this.touchStartX = 0;
    this.touchEndX = 0;
  }

}
