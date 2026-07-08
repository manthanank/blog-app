import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getComments(postId: string | number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/comments/post/${postId}`);
  }

  addComment(postId: string | number, author: string, content: string): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/comments/post/${postId}`, { author, content });
  }

  likeComment(commentId: string | number): Observable<Comment> {
    return this.http.put<Comment>(`${this.apiUrl}/comments/like/${commentId}`, {});
  }

  deleteComment(commentId: string | number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/comments/${commentId}`);
  }
}