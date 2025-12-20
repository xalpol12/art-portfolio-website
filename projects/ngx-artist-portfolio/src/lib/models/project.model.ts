import {ContentType} from './content-type';

export interface ProjectModel {
  id: string;
  content: ContentModel[];
}

export type ContentModel = BasicModel | ParagraphModel | GalleryGridModel;

export interface BasicModel {
  type: ContentType.BREAK;
}

export interface ParagraphModel {
  type: ContentType.PARAGRAPH;
  data: ParagraphDataModel;
}

export interface GalleryGridModel {
  type: ContentType.GALLERY_GRID;
  config?: GalleryGridConfig;
  data?: GalleryGridDataModel;
}

export interface GalleryGridConfig {
  orientation: 'horizontal' | 'vertical';
  gap?: number;
}

export type ParagraphDataModel = string;
export type GalleryGridDataModel = string[];
