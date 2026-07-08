export interface Comment {
  id: string | number;
  postId: string | number;
  author: string;
  content: string;
  createdAt: Date;
  likes: number;
}