export type Featured = FeaturedBlogs[];
export type Recent = RecentBlogs[];
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
}

export interface RecentBlogs {
  _id: string;
  slug?: string;
  title: string;
  content: string;
  desc: string;
  author: string;
  authorId: string;
  tags: string[];
  createdAt: string;
  featured: boolean;
  __v: number;
}
