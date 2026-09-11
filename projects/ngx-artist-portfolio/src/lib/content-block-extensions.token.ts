import {InjectionToken, Type} from '@angular/core';

/**
 * Maps a custom content block `type` (see `CustomBlockModel`) to the component that
 * renders it. The component receives the block via a `block` input.
 */
export interface ContentBlockExtension<TBlock = unknown> {
  type: string;
  component: Type<{ block: TBlock }>;
}

export const CONTENT_BLOCK_EXTENSIONS = new InjectionToken<ContentBlockExtension[]>('CONTENT_BLOCK_EXTENSIONS', {
  factory: () => [],
});
