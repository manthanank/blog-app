import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { FeaturedBlogs, RecentBlogs } from '../models/blog.model';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class BlogsService {

  http = inject(HttpClient);
  
  // get all blogs
  getBlogs() {
    return this.http.get(`${apiUrl}/blogs`);
  }

  // get featured blogs
  getFeaturedBlogs() {
    return this.http.get<FeaturedBlogs>(`${apiUrl}/blogs/featured`);
  }

  // get recent blogs
  getRecentBlogs() {
    return this.http.get<RecentBlogs>(`${apiUrl}/blogs/recent`);
  }

  // get blog by id
  getBlog(id: string) {
    return this.http.get(`${apiUrl}/blogs/${id}`);
  }

  // add blog
  addBlog(title: string, content: string) {
    const blog = { title, content };
    return this.http.post(`${apiUrl}/blogs`, blog);
  }

  // update blog
  updateBlog(id: string, title: string, content: string) {
    const blog = { title, content };
    return this.http.put(`${apiUrl}/blogs/${id}`, blog);
  }

  deleteBlog(id: string) {
    return this.http.delete(`${apiUrl}/blogs/${id}`);
  }
}
