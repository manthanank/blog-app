import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tag } from '../models/tag.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  private colors = [
    'bg-blue-50 text-blue-700 border-blue-200',
    'bg-purple-50 text-purple-700 border-purple-200',
    'bg-green-50 text-green-700 border-green-200',
    'bg-pink-50 text-pink-700 border-pink-200',
    'bg-indigo-50 text-indigo-700 border-indigo-200',
    'bg-amber-50 text-amber-700 border-amber-200',
    'bg-cyan-50 text-cyan-700 border-cyan-200',
    'bg-rose-50 text-rose-700 border-rose-200'
  ];

  getTags(): Observable<Tag[]> {
    return this.http.get<string[]>(`${this.apiUrl}/tags`).pipe(
      map(tags => (tags || []).map((tag, index) => ({
        id: tag.toLowerCase(),
        name: tag,
        color: this.colors[index % this.colors.length]
      })))
    );
  }

  getTag(id: string): Observable<Tag> {
    return this.getTags().pipe(
      map(tags => tags.find(t => t.id === id.toLowerCase()) || {
        id: id.toLowerCase(),
        name: id,
        color: 'bg-gray-50 text-gray-700 border-gray-200'
      })
    );
  }

  getTagsForPost(tagNames: string[]): Observable<Tag[]> {
    return this.getTags().pipe(
      map(allTags => {
        const tagMap = new Map(allTags.map(t => [t.name.toLowerCase(), t]));
        return tagNames.map(name => tagMap.get(name.toLowerCase()) || {
          id: name.toLowerCase(),
          name,
          color: 'bg-gray-50 text-gray-700 border-gray-200'
        });
      })
    );
  }
}
