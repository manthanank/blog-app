import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class BlogsService {

  http = inject(HttpClient);

  // get featured blogs by username
  getFeaturedBlogsByUsername(username: string) {
    return this.http.get(`${apiUrl}/blogs/featured/${username}`);
  }

  // get all blogs
  getAllBlogs(limit: number, page: number, search: string = '') {
    return this.http.get(`${apiUrl}/blogs`, { params: { limit: limit.toString(), page: page.toString(), search } });
  }

  // get latest blogs
  getLatestBlogs() {
    return this.http.get(`${apiUrl}/blogs/latest`);
  }

  // get blog by id
  getBlog(id: string) {
    return this.http.get(`${apiUrl}/blogs/${id}`);
  }

  // get blog by author
  getBlogByAuthor(author: string) {
    return this.http.get(`${apiUrl}/blogs/author/${author}`);
  }

  // get blog by username
  getBlogByUsername(username: string) {
    return this.http.get(`${apiUrl}/blogs/all/${username}`);
  }

  // add blog
  addBlog(blog: any) {
    return this.http.post(`${apiUrl}/blogs`, blog);
  }

  // update blog
  updateBlog(id: string, data: any) {
    return this.http.put(`${apiUrl}/blogs/${id}`, data);
  }

  // delete blog
  deleteBlog(id: string) {
    return this.http.delete(`${apiUrl}/blogs/${id}`);
  }

  // visitCount blog
  visitCount(id: string) {
    return this.http.put(`${apiUrl}/blogs/visit/${id}`, {});
  }

  calculateReadingTime(text: string): string {
    const wordsPerMinute = 200;
    const textLength = text.split(' ').length;
    const readingTime = Math.ceil(textLength / wordsPerMinute);
    return `${readingTime} min read`;
  }
}
