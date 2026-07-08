import { Component, Input } from '@angular/core';
import { Post } from '../../models/post.model';
import { BackButtonComponent } from '../shared/back-button.component';
import { PostHeaderComponent } from './post-header.component';
import { PostContentComponent } from './post-content.component';

@Component({
  selector: 'app-post-article',
  standalone: true,
  imports: [BackButtonComponent, PostHeaderComponent, PostContentComponent],
  template: `
    <article class="bg-white rounded-lg shadow-md p-8">
      <app-back-button />
      <app-post-header
        [title]="post.title"
        [tags]="post.tags"
        [author]="post.author"
        [postedDate]="post.postedDate"
        [updatedDate]="post.updatedDate"
      />
      <app-post-content [content]="post.content" />
    </article>
  `
})
export class PostArticleComponent {
  @Input() post!: Post;
}
