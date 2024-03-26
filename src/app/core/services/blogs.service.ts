import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { FeaturedBlogs, RecentBlogs } from '../models/blog.model';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class BlogsService {

  http = inject(HttpClient);

  // get featured blogs
  getFeaturedBlogs() {
    return this.http.get<FeaturedBlogs>(`${apiUrl}/blogs/featured`);
  }

  // get featured blogs by author
  getFeaturedBlogsByAuthor(author: string) {
    return this.http.get<FeaturedBlogs>(`${apiUrl}/blogs/featured/${author}`);
  }

  // get latest blogs
  getLatestBlogs() {
    return this.http.get<FeaturedBlogs>(`${apiUrl}/blogs/latest`);
  }

  // get recent blogs
  getRecentBlogs() {
    return this.http.get<RecentBlogs>(`${apiUrl}/blogs/recent`);
  }

  // get recent blogs by author
  getRecentBlogsByAuthor(author: string) {
    return this.http.get<RecentBlogs>(`${apiUrl}/blogs/recent/${author}`);
  }

  // get blog by id
  getBlog(id: string) {
    return this.http.get(`${apiUrl}/blogs/${id}`);
  }

  // get blog by author
  getBlogByAuthor(author: string) {
    return this.http.get(`${apiUrl}/blogs/author/${author}`);
  }

  // add blog
  addBlog(blog: any) {
    return this.http.post(`${apiUrl}/blogs`, blog);
  }

  // update blog
  updateBlog(id: string, data: any) {
    return this.http.put(`${apiUrl}/blogs/${id}`, data);
  }

  deleteBlog(id: string) {
    return this.http.delete(`${apiUrl}/blogs/${id}`);
  }
}
