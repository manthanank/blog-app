import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post, PaginatedPosts } from '../models/post.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getPosts(page: number = 1, pageSize: number = 6, searchQuery: string = ''): Observable<PaginatedPosts> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', pageSize.toString());

    if (searchQuery) {
      params = params.set('search', searchQuery);
    }

    return this.http.get<{ posts: any[]; total: number }>(`${this.apiUrl}/blogs`, { params }).pipe(
      map(res => {
        const posts = (res.posts || []).map(post => this.mapPost(post));
        const total = res.total || 0;
        return {
          items: posts,
          total,
          currentPage: page,
          pageSize,
          totalPages: Math.ceil(total / pageSize) || 1,
          totalItems: total
        };
      })
    );
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<any>(`${this.apiUrl}/blogs/${id}`).pipe(
      map(post => this.mapPost(post))
    );
  }

  createPost(postForm: any, author: string, authorId: string): Observable<any> {
    const postPayload = {
      title: postForm.title,
      desc: postForm.desc || postForm.content.slice(0, 150),
      content: postForm.content,
      tags: postForm.tags || [],
      author,
      authorId,
      featured: postForm.featured || false,
      status: postForm.status || 'published'
    };
    return this.http.post<any>(`${this.apiUrl}/blogs`, postPayload);
  }

  updatePost(id: string, postForm: any): Observable<any> {
    const postPayload = {
      title: postForm.title,
      desc: postForm.desc || postForm.content.slice(0, 150),
      content: postForm.content,
      tags: postForm.tags || [],
      featured: postForm.featured || false,
      status: postForm.status || 'published'
    };
    return this.http.put<any>(`${this.apiUrl}/blogs/${id}`, postPayload);
  }

  deletePost(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/blogs/${id}`);
  }

  getPostsByUsername(username: string): Observable<Post[]> {
    return this.http.get<any[]>(`${this.apiUrl}/blogs/all/${username}`).pipe(
      map(posts => (posts || []).map(post => this.mapPost(post)))
    );
  }

  getFeaturedPostsByUsername(username: string): Observable<Post[]> {
    return this.http.get<any[]>(`${this.apiUrl}/blogs/featured/${username}`).pipe(
      map(posts => (posts || []).map(post => this.mapPost(post)))
    );
  }

  incrementVisitCount(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/blogs/visit/${id}`, {});
  }

  private mapPost(dbPost: any): Post {
    return {
      _id: dbPost._id,
      id: dbPost._id,
      title: dbPost.title,
      desc: dbPost.desc,
      content: dbPost.content,
      author: dbPost.author,
      authorId: dbPost.authorId,
      postedDate: dbPost.createdAt ? new Date(dbPost.createdAt) : new Date(),
      updatedDate: dbPost.updatedAt ? new Date(dbPost.updatedAt) : undefined,
      tags: dbPost.tags || [],
      featured: dbPost.featured,
      visitCount: dbPost.visitCount,
      readingTime: this.calculateReadingTime(dbPost.content || ''),
      status: dbPost.status || 'published'
    };
  }

  private calculateReadingTime(content: string): string {
    const wordsPerMinute = 200;
    const cleanText = content.replace(/<[^>]*>/g, '');
    const wordCount = cleanText.split(/\s+/).filter(w => w.length > 0).length;
    const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
    return `${minutes} min read`;
  }
}