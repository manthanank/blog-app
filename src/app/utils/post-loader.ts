import { Post } from '../models/post.model';
import posts from '../data/posts.json';

interface RawPost {
  id: number;
  title: string;
  content: string;
  author: string;
  postedDate: string;
  updatedDate?: string;
  tags: string[];
}

export function loadAllPosts(): Post[] {
  return posts.posts.map((post: RawPost) => ({
    ...post,
    postedDate: new Date(post.postedDate),
    updatedDate: post.updatedDate ? new Date(post.updatedDate) : undefined,
  }));
}