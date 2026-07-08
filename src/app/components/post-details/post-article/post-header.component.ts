import { Component, Input } from '@angular/core';
import { Post } from '../../../models/post.model';
import { TagListComponent } from '../../shared/tag-list.component';
import { PostMetadataComponent } from '../../shared/post-metadata.component';

@Component({
  selector: 'app-post-header',
  standalone: true,
  imports: [TagListComponent, PostMetadataComponent],
  template: `
    <header class="mb-8">
      <h1 class="text-4xl font-bold mb-6">{{ post.title }}</h1>
      <app-tag-list [tags]="post.tags" class="mb-6" />
      <app-post-metadata 
        [author]="post.author" 
        [postedDate]="post.postedDate"
        [updatedDate]="post.updatedDate" 
        [readingTime]="post.readingTime"
      />
    </header>
  `
})
export class PostHeaderComponent {
  @Input() post!: Post;
}