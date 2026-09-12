import {ChangeDetectionStrategy, Component, computed, inject, Input, signal} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: `apw-video`,
  template: `
    @if (src) {
      <div class="video-wrapper" [style.aspect-ratio]="aspectRatio || '16 / 9'">
        @if (isEmbed()) {
          @if (played()) {
            <iframe
              [src]="embedUrl()"
              [title]="title || 'Project video'"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen>
            </iframe>
          } @else {
            <button type="button" class="video-facade" [attr.aria-label]="'Play: ' + (title || 'video')"
                    (click)="played.set(true)">
              @if (facadePoster(); as posterUrl) {
                <img [src]="posterUrl" [alt]="''" loading="lazy"/>
              }
              <span class="play-icon" aria-hidden="true"></span>
            </button>
          }
        } @else {
          <video
            [attr.poster]="poster || null"
            [controls]="controls"
            [autoplay]="autoplay"
            [loop]="loop"
            [muted]="muted"
            playsinline>
            <source [src]="src" />
          </video>
        }
      </div>
    }
  `,
  standalone: true,
  styleUrl: 'video.scss'
})
export class Video {
  @Input() src: string | undefined;
  @Input() provider: 'youtube' | 'vimeo' | 'file' | undefined;
  @Input() poster: string | undefined;
  @Input() title: string | undefined;
  @Input() aspectRatio: string | undefined;
  @Input() controls = true;
  @Input() autoplay = false;
  @Input() loop = false;
  @Input() muted = false;

  private readonly sanitizer = inject(DomSanitizer);

  /**
   * Whether the visitor has clicked play. Until then, YouTube/Vimeo embeds only render a
   * lightweight poster + play button — the heavy embed iframe (and its own JS bundle) is
   * never fetched, which matters most on metered mobile connections.
   */
  protected readonly played = signal(false);

  private readonly resolvedProvider = computed(() => this.resolveProvider(this.src, this.provider));

  protected readonly isEmbed = computed(() => this.resolvedProvider() !== 'file');

  protected readonly embedUrl = computed<SafeResourceUrl | null>(() => {
    const value = this.src;
    if (!value || this.resolvedProvider() === 'file') {
      return null;
    }

    const embedPath = this.buildEmbedPath(value, this.resolvedProvider());
    return embedPath ? this.sanitizer.bypassSecurityTrustResourceUrl(embedPath) : null;
  });

  /** The explicit `poster`, or a no-network-call fallback for YouTube; `null` otherwise (Vimeo has no such URL scheme). */
  protected readonly facadePoster = computed<string | null>(() => {
    if (this.poster) {
      return this.poster;
    }
    if (this.resolvedProvider() === 'youtube' && this.src) {
      const youtubeId = this.extractYouTubeId(this.src);
      return youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : null;
    }
    return null;
  });

  private resolveProvider(
    src: string | undefined,
    provider: 'youtube' | 'vimeo' | 'file' | undefined
  ): 'youtube' | 'vimeo' | 'file' {
    if (provider) {
      return provider;
    }

    if (!src) {
      return 'file';
    }

    if (src.includes('youtu.be') || src.includes('youtube.com')) {
      return 'youtube';
    }

    if (src.includes('vimeo.com')) {
      return 'vimeo';
    }

    return 'file';
  }

  private buildEmbedPath(src: string, provider: 'youtube' | 'vimeo' | 'file'): string | null {
    if (provider === 'youtube') {
      const youtubeId = this.extractYouTubeId(src);
      return youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : null;
    }

    if (provider === 'vimeo') {
      const vimeoId = this.extractVimeoId(src);
      return vimeoId ? `https://player.vimeo.com/video/${vimeoId}` : null;
    }

    return null;
  }

  private extractYouTubeId(src: string): string | null {
    const idPattern = /^[a-zA-Z0-9_-]{11}$/;

    if (idPattern.test(src)) {
      return src;
    }

    try {
      const parsedUrl = new URL(src);
      const host = parsedUrl.hostname.toLowerCase();

      if (host.includes('youtu.be')) {
        const id = parsedUrl.pathname.split('/').filter(Boolean)[0];
        return idPattern.test(id) ? id : null;
      }

      if (host.includes('youtube.com')) {
        const watchId = parsedUrl.searchParams.get('v');
        if (watchId && idPattern.test(watchId)) {
          return watchId;
        }

        const pathSegments = parsedUrl.pathname.split('/').filter(Boolean);
        const embedId = pathSegments[pathSegments.length - 1];
        return idPattern.test(embedId) ? embedId : null;
      }

      return null;
    } catch {
      return null;
    }
  }

  private extractVimeoId(src: string): string | null {
    if (/^\d+$/.test(src)) {
      return src;
    }

    try {
      const parsedUrl = new URL(src);
      const pathSegments = parsedUrl.pathname.split('/').filter(Boolean);
      const lastSegment = pathSegments[pathSegments.length - 1];

      return /^\d+$/.test(lastSegment) ? lastSegment : null;
    } catch {
      return null;
    }
  }
}

