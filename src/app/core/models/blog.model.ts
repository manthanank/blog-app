export interface Blogs {
  posts: Blog[];
}
export interface Blog {
  _id: string;
  title: string;
  desc: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string;
  __v: number;
  featured: boolean;
  slug?: string;
  tags: string[];
  visitCount?: number;
}