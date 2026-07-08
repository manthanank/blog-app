import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { PostForm } from '../../models/post-form.model';
import { PostFormComponent } from '../post-form/post-form.component';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [PostFormComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Create New Post</h1>
      <div class="bg-white rounded-lg shadow-md p-6">
        <app-post-form
          (save)="onSave($event)"
          (onCancel)="onCancel()"
        />
      </div>
    </div>
  `,
})
export class CreatePostComponent {
  private postService = inject(PostService);
  private authService = inject(AuthService);
  private router = inject(Router);

  onSave(postForm: PostForm) {
    const author = this.authService.getUserName() || 'Anonymous';
    const authorId = this.authService.getUserId() || '';
    this.postService.createPost(postForm, author, authorId).subscribe(() => {
      this.router.navigate(['/blogs']);
    });
  }

  onCancel() {
    this.router.navigate(['/blogs']);
  }
}