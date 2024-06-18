export type Featured = FeaturedBlogs[];
export type Latest = LatestBlogs[];
export interface Blogs {
  posts: Blog[];
}

export type Tags = string[]

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

export interface FeaturedBlogs {
  _id: string;
  title: string;
  desc: string;
  content: string;
  author: string;
  authorId: string;
  tags: string[];
  createdAt: string;
  featured: boolean;
  __v: number;
  slug?: string;
  visitCount?: number;
}

export interface LatestBlogs {
  _id: string;
  title: string;
  desc: string;
  content: string;
  author: string;
  authorId: string;
  tags: string[];
  createdAt: string;
  featured: boolean;
  __v: number;
  slug?: string;
  visitCount?: number;
}