export type ContentBlockType = 'text' | 'code';

export interface ContentBlock {
  type: ContentBlockType;
  content: string;
}