import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { PostForm } from '../../models/post-form.model';
import { PostFormComponent } from '../post-form/post-form.component';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [PostFormComponent, AsyncPipe],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Edit Post</h1>
      <div class="bg-white rounded-lg shadow-md p-6">
        @if (post$ | async; as post) {
        <app-post-form
          [post]="post"
          (save)="onSave($event)"
          (onCancel)="onCancel(post)"
        />
        } @else {
        <p class="text-gray-600">Loading post...</p>
        }
      </div>
    </div>
  `,
})
export class EditPostComponent implements OnInit {
  post$: Observable<Post | undefined>;

  private postService = inject(PostService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    this.post$ = this.route.params.pipe(
      switchMap((params) =>
        this.postService.getPost(params['id'])
      )
    );
  }

  ngOnInit() {
    this.post$.subscribe((post) => {
      if (!post) {
        this.router.navigate(['/blogs']);
      }
    });
  }

  onSave(postForm: PostForm) {
    const id = this.route.snapshot.params['id'];
    this.postService.updatePost(id, postForm).subscribe((post) => {
      if (post) {
        this.router.navigate(['/blogs', post.id]);
      }
    });
  }

  onCancel(post: Post) {
    this.router.navigate(['/blogs', post.id]);
  }
}
