import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  http = inject(HttpClient);

  constructor() {}

  // get all tags
  getTags() {
    return this.http.get(`${apiUrl}/tags`);
  }
  
  // get blog by tag
  getBlogByTag(tag: string) {
    return this.http.get(`${apiUrl}/tags/${tag}`);
  }
}
