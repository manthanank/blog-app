export interface Post {
  _id: string;
  id: string;
  title: string;
  desc?: string;
  content: string;
  author: string;
  authorId: string;
  postedDate: Date;
  updatedDate?: Date;
  tags: string[];
  featured?: boolean;
  visitCount?: number;
  readingTime?: string;
  status?: 'draft' | 'published';
}

export interface PostForm {
  title: string;
  desc?: string;
  content: string;
  tags: string[];
  featured?: boolean;
  status?: 'draft' | 'published';
}

export interface PaginatedPosts {
  items: Post[];
  total: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}
