export interface PostForm {
  title: string;
  content: string;
  tags: string[];
  status?: 'draft' | 'published';
}