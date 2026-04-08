import {ContentType} from './content-type';

export interface ProjectModel {
  id: string;
  content: ContentModel[];
}

export type ContentModel = BasicModel | ParagraphModel | ImageModel | GalleryGridModel;

export interface BasicModel {
  type: ContentType.BREAK;
}

export interface ParagraphModel {
  type: ContentType.PARAGRAPH;
  data: ParagraphDataModel;
}

export interface ImageModel {
  type: ContentType.IMAGE;
  image: string;
  description?: ImageDescriptionModel;
  width?: number;
  height?: number;
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
  title?: string;
  medium?: string;
  size?: string;
  year?: string;
  additionalInfo?: string;
}
