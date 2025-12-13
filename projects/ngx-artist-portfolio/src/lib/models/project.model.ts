import {ContentType} from './content-type';

export interface ProjectModel {
  id: string;
  content: ContentModel[];
}

export interface ThumbnailModel {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface ContentModel {
  type: ContentType;
  data: string;
}
