export interface Dimensions {
  width: number;
  height: number;
}

/**
 * Scales `width`/`height` down (never up) to fit within `maxWidth`/`maxHeight`, preserving
 * aspect ratio. Used before binding to `NgOptimizedImage`'s `[width]`/`[height]`: those inputs
 * only exist to establish the correct aspect ratio (actual rendered size is controlled by CSS),
 * but `NgOptimizedImage` refuses to generate any `srcset` at all once `width`/`height` exceed
 * 1920x1080 — passing an oversized source's native resolution straight through would silently
 * ship the full-resolution image to every device, mobile included.
 */
export function clampDimensions(width: number, height: number, maxWidth = 1920, maxHeight = 1080): Dimensions {
  const scale = Math.min(1, maxWidth / width, maxHeight / height);
  if (scale >= 1) {
    return {width, height};
  }
  return {width: Math.round(width * scale), height: Math.round(height * scale)};
}
