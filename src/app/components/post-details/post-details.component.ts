import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { CommentService } from '../../services/comment.service';
import { Observable, switchMap, tap } from 'rxjs';
import { Post } from '../../models/post.model';
import { Comment } from '../../models/comment.model';
import { PostArticleComponent } from './post-article/post-article.component';
import { PostNotFoundComponent } from './post-not-found/post-not-found.component';
import { CommentFormComponent } from './comments/comment-form.component';
import { CommentListComponent } from './comments/comment-list.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [
    AsyncPipe,
    PostArticleComponent, 
    PostNotFoundComponent,
    CommentFormComponent,
    CommentListComponent
  ],
  template: `
    <div class="container mx-auto px-4 py-8">
      @if (post$ | async; as post) {
          <app-post-article [post]="post" />
          
          <!-- Comments Section -->
          <div class="mt-12">
            <h2 class="text-2xl font-bold mb-6">Comments</h2>
            
            <!-- Comment Form -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 class="text-lg font-semibold mb-4">Leave a Comment</h3>
              <app-comment-form (submitComment)="onCommentSubmit($event)" />
            </div>
            
            <!-- Comment List -->
            <app-comment-list [comments]="comments" [postAuthorId]="post.authorId" />
          </div>
      } @else {
        <app-post-not-found />
      }
    </div>
  `
})
export class PostDetailsComponent {
  post$: Observable<Post | undefined>;
  comments: Comment[] = [];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService
  ) {
    this.post$ = this.route.params.pipe(
      switchMap(params => this.postService.getPost(params['id'])),
      tap(post => {
        if (post) {
          this.loadComments(post.id);
        }
      })
    );
  }

  private loadComments(postId: string | number) {
    this.commentService.getComments(postId).subscribe(comments => {
      this.comments = comments;
    });
  }

  onCommentSubmit(comment: {author: string; content: string}) {
    const postId = this.route.snapshot.params['id'];
    this.commentService.addComment(postId, comment.author, comment.content)
      .subscribe(newComment => {
        this.comments = [newComment, ...this.comments];
      });
  }
}