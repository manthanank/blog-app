import { Component, Input } from '@angular/core';
import { Post } from '../../../models/post.model';
import { PostCardComponent } from '../../post-list/post-card/post-card.component';

@Component({
  selector: 'app-latest-posts',
  standalone: true,
  imports: [PostCardComponent],
  template: `
    @if (posts.length > 0) {
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        @for (post of posts; track $index) {
          <app-post-card [post]="post" />
        }
      </div>
    } @else {
      <div class="text-center py-12">
        <p class="text-gray-600">No posts available.</p>
      </div>
    }
  `
})
export class LatestPostsComponent {
  @Input() posts: Post[] = [];
}