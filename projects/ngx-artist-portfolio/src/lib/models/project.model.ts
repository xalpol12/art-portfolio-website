import {ContentType} from './content-type';

export interface ProjectModel {
  blocks: ContentModel[];
}

export interface ContentModel {
  type: ContentType;
  data: string;
}
