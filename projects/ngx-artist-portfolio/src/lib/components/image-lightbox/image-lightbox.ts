import {Component, computed, effect, HostListener, input, output, signal} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: `apw-img-lightbox`, template: `
    @if (isOpen()) {
      <div class="modal"
           (click)="onBackdropClick($event)"
           (wheel)="onWheel($event)"
           (touchstart)="onTouchStart($event)"
           (touchend)="onTouchEnd()"
           (touchmove)="onTouchMove($event)">
        <span class="close" (click)="closeModal()">&times;</span>

        <div class="modal-content"
             [class.zoomed]="isZoomed()"
             [style.transform]="imageTransform()"
             [style.cursor]="isZoomed() ? 'grab' : 'default'"
             (mousedown)="onPanStart($event)"
             (mousemove)="onPanMove($event)"
             (mouseup)="onPanEnd()"
             (mouseleave)="onPanEnd()"
             (dblclick)="onDoubleClick()">
          @if (loading()) {
            <div class="spinner-wrapper">
              <div class="spinner"></div>
            </div>
          }
          <img [ngSrc]="currentImage()" [alt]="currentAlt()" class="lightbox-img"
               [class.loaded]="!loading()" (load)="onImageLoaded()" fill/>
        </div>

        @if (images() && images().length > 1) {
          <a class="prev" (click)="nextSlide(-1)">&#10094;</a>
          <a class="next" (click)="nextSlide(1)">&#10095;</a>
          <div class="image-counter">{{ currentIndex() + 1 }} / {{ images().length }}</div>
        }
      </div>
    }
  `, standalone: true, imports: [
    NgOptimizedImage
  ], styleUrl: 'image-lightbox.scss'
})
export class ImageLightbox {
  images = input<string[]>([]);
  currentIndex = input<number>(0);
  isOpen = input<boolean>(false);
  zoomDisabled = input<boolean>(false);

  closeOutput = output<void>();
  indexChanged = output<number>();

  // Loading state
  protected loading = signal(true);

  // Zoom state
  protected zoom = signal(1);
  protected panX = signal(0);
  protected panY = signal(0);

  private readonly MIN_ZOOM = 1;
  private readonly MAX_ZOOM = 5;
  private readonly ZOOM_STEP = 0.5;

  // Pan state
  private isPanning = false;
  private panStartX = 0;
  private panStartY = 0;
  private panOriginX = 0;
  private panOriginY = 0;

  // Swipe state
  private touchStartX = 0;
  private touchEndX = 0;
  private touchStartedOnControl = false;
  private readonly SWIPE_THRESHOLD = 50;

  protected isZoomed = computed(() => !this.zoomDisabled && this.zoom() > 1);

  protected imageTransform = computed(() => {
    const z = this.zoom();
    const x = this.panX();
    const y = this.panY();
    return `scale(${z}) translate(${x}px, ${y}px)`;
  });

  constructor() {
    // Reset zoom and loading state when slide changes
    effect(() => {
      this.currentIndex();
      this.loading.set(true);
      this.resetZoom();
    });
  }

  currentImage = computed(() => {
    const imgs = this.images();
    const idx = this.currentIndex();
    return imgs[idx] || '';
  });

  currentAlt = computed(() => {
    const idx = this.currentIndex();
    const total = this.images().length;
    return `Image ${idx + 1} of ${total}`;
  });

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (!this.isOpen()) return;

    switch (event.key) {
      case 'Escape':
        this.closeModal();
        break;
      case 'ArrowLeft':
        if (!this.isZoomed()) this.nextSlide(-1);
        event.preventDefault();
        break;
      case 'ArrowRight':
        if (!this.isZoomed()) this.nextSlide(1);
        event.preventDefault();
        break;
      case '+':
      case '=':
        this.zoomIn();
        event.preventDefault();
        break;
      case '-':
        this.zoomOut();
        event.preventDefault();
        break;
      case '0':
        this.resetZoom();
        event.preventDefault();
        break;
    }
  }

  closeModal(): void {
    this.resetZoom();
    this.closeOutput.emit();
  }

  onImageLoaded(): void {
    this.loading.set(false);
  }

  nextSlide(step: number): void {
    const imgs = this.images();
    if (!imgs || imgs.length === 0) return;

    const total = imgs.length;
    const newIndex = (this.currentIndex() + step + total) % total;
    this.indexChanged.emit(newIndex);
  }

  // --- Zoom ---

  zoomIn(): void {
    if (this.zoomDisabled()) return;
    this.zoom.update(z => Math.min(z + this.ZOOM_STEP, this.MAX_ZOOM));
    if (!this.isZoomed()) this.resetPan();
  }

  zoomOut(): void {
    if (this.zoomDisabled()) return;
    this.zoom.update(z => Math.max(z - this.ZOOM_STEP, this.MIN_ZOOM));
    if (!this.isZoomed()) this.resetPan();
  }

  resetZoom(): void {
    if (this.zoomDisabled()) return;
    this.zoom.set(1);
    this.resetPan();
  }

  onWheel(event: WheelEvent): void {
    if (this.zoomDisabled()) return;
    event.preventDefault();
    if (event.deltaY < 0) {
      this.zoomIn();
    } else {
      this.zoomOut();
    }
  }

  onDoubleClick(): void {
    if (this.zoomDisabled()) return;
    if (this.isZoomed()) {
      this.resetZoom();
    } else {
      this.zoom.set(2.5);
    }
  }

  // --- Pan ---

  onPanStart(event: MouseEvent): void {
    if (!this.isZoomed()) return;
    this.isPanning = true;
    this.panStartX = event.clientX;
    this.panStartY = event.clientY;
    this.panOriginX = this.panX();
    this.panOriginY = this.panY();
    event.preventDefault();
  }

  onPanMove(event: MouseEvent): void {
    if (!this.isPanning) return;
    const dx = (event.clientX - this.panStartX) / this.zoom();
    const dy = (event.clientY - this.panStartY) / this.zoom();
    this.panX.set(this.panOriginX + dx);
    this.panY.set(this.panOriginY + dy);
  }

  onPanEnd(): void {
    this.isPanning = false;
  }

  private resetPan(): void {
    this.panX.set(0);
    this.panY.set(0);
  }

  // --- Touch swipe / pinch ---

  onBackdropClick(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.closeModal();
    }
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
    this.touchStartedOnControl = this.isInteractiveTouchTarget(event.target);
  }

  onTouchMove(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
  }

  onTouchEnd(): void {
    if (this.touchStartedOnControl) {
      this.touchStartedOnControl = false;
      this.touchStartX = 0;
      this.touchEndX = 0;
      return;
    }

    if (this.isZoomed()) return;

    const swipeDistance = this.touchStartX - this.touchEndX;
    if (Math.abs(swipeDistance) > this.SWIPE_THRESHOLD) {
      this.nextSlide(swipeDistance > 0 ? 1 : -1);
    }
    this.touchStartX = 0;
    this.touchEndX = 0;
  }

  private isInteractiveTouchTarget(target: EventTarget | null): boolean {
    if (!(target instanceof HTMLElement)) return false;

    return Boolean(target.closest('.close, .prev, .next'));
  }

}
