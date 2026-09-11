/**
 * The block types `ProjectRendererComponent` knows how to render out of the box. For
 * anything else, register a `ContentBlockExtension` via `providePortfolio` instead of
 * extending this enum.
 */
export enum ContentType {
  PARAGRAPH = 'paragraph',
  LINK = 'link',
  QUOTE = 'quote',
  BREAK = 'break',
  IMAGE = 'image',
  VIDEO = 'video',
  GALLERY_GRID = 'gallery-grid'
}
