import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../../models/post.model';
import { BackButtonComponent } from '../../shared/back-button.component';
import { PostHeaderComponent } from './post-header.component';
import { PostContentComponent } from './post-content.component';
import { DeleteButtonComponent } from '../../shared/delete-button.component';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-post-article',
  standalone: true,
  imports: [
    BackButtonComponent,
    PostHeaderComponent,
    PostContentComponent,
    DeleteButtonComponent,
  ],
  template: `
    <article class="bg-white rounded-lg shadow-md p-8">
      <app-back-button />
      <div class="flex justify-end space-x-4 mt-4">
        <button
          (click)="onEdit()"
          class="text-blue-600 hover:text-blue-800 font-medium"
        >
          Edit
        </button>
        <app-delete-button [itemName]="post.title" (delete)="onDelete()" />
      </div>
      <app-post-header [post]="post" />
      <app-post-content [content]="post.content" />
    </article>
  `,
})
export class PostArticleComponent {
  @Input() post!: Post;

  private router = inject(Router);
  private postService = inject(PostService);

  constructor() {}

  onEdit() {
    this.router.navigate(['/blogs', this.post.id, 'edit']);
  }

  onDelete() {
    this.postService.deletePost(this.post.id).subscribe(() => {
      this.router.navigate(['/blogs']);
    });
  }
}