import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../../models/post.model';
import { PostMetadataComponent } from '../shared/post-metadata.component';
import { TagListComponent } from '../shared/tag-list.component';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [RouterLink, PostMetadataComponent, TagListComponent],
  template: `
    <article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <a [routerLink]="['/post', post.id]" class="block p-6">
        <h3 class="text-xl font-semibold mb-2 text-gray-900 hover:text-blue-600">{{ post.title }}</h3>
        <p class="text-gray-600 mb-4">{{ post.content.substring(0, 40) }}...</p>
        <app-tag-list [tags]="post.tags" class="mb-4" />
        <app-post-metadata 
          [author]="post.author" 
          [postedDate]="post.postedDate"
          [updatedDate]="post.updatedDate" 
        />
      </a>
    </article>
  `,
})
export class PostCardComponent {
  @Input() post!: Post;
}
