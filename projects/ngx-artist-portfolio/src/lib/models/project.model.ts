import {ContentType} from './content-type';

export interface ProjectModel {
  id: string;
  content: ContentModel[];
}

export type ContentModel = BasicModel | ParagraphModel | QuoteModel | ImageModel | VideoModel | GalleryGridModel;

export interface BasicModel {
  type: ContentType.BREAK;
}

export interface ParagraphModel {
  type: ContentType.PARAGRAPH;
  data: ParagraphDataModel;
}

export interface QuoteModel {
  type: ContentType.QUOTE;
  text: string;
  author?: string;
  cite?: string;
}

export interface ImageModel {
  type: ContentType.IMAGE;
  image: string;
  width?: number;
  height?: number;
  description?: ImageDescriptionModel;
}

export interface VideoModel {
  type: ContentType.VIDEO;
  src: string;
  provider?: 'youtube' | 'vimeo' | 'file';
  poster?: string;
  title?: string;
  aspectRatio?: string;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export interface GalleryGridModel {
  type: ContentType.GALLERY_GRID;
  data: GalleryGridDataModel;
  description?: ImageDescriptionModel;
  config?: GalleryGridConfig;
}

export type GalleryGridConfig = {
  orientation: 'horizontal' | 'vertical';
  gap?: number;
}

export type ParagraphDataModel = string;
export type GalleryGridDataModel = string[];
export type ImageDescriptionModel = {
  justify?: 'left' | 'center' | 'right';
  title?: string;
  medium?: string;
  size?: string;
  year?: string;
  additionalInfo?: string;
}
