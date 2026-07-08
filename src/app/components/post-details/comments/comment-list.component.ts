import { Component, inject, Input } from '@angular/core';
import { Comment } from '../../../models/comment.model';
import { CommentService } from '../../../services/comment.service';
import { AuthService } from '../../../services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [DatePipe],
  template: `
    <div class="space-y-6">
      @for (comment of comments; track $index) {
      <div class="bg-white rounded-lg shadow-sm p-4 border border-gray-100 animate-fadeIn">
        <div class="flex items-start justify-between mb-2">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 
                          flex items-center justify-center text-white font-semibold text-lg"
            >
              {{ comment.author[0].toUpperCase() }}
            </div>
            <div>
              <div class="font-medium text-gray-900">{{ comment.author }}</div>
              <div class="text-sm text-gray-500">
                {{ comment.createdAt | date : 'MMM d, y' }}
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button
              (click)="likeComment(comment)"
              class="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span class="text-sm">{{ comment.likes }}</span>
            </button>

            @if (canDeleteComment(comment)) {
              <button
                (click)="onDeleteComment(comment)"
                class="text-red-500 hover:text-red-700 transition-colors"
                title="Delete comment"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            }
          </div>
        </div>

        <p class="text-gray-700 text-sm leading-relaxed">
          {{ comment.content }}
        </p>
      </div>
      } @if (comments.length === 0) {
      <p class="text-center text-gray-500 py-4">
        No comments yet. Be the first to comment!
      </p>
      }
    </div>
  `,
})
export class CommentListComponent {
  @Input() comments: Comment[] = [];
  @Input() postAuthorId?: string;

  private commentService = inject(CommentService);
  private authService = inject(AuthService);

  constructor() {}

  likeComment(comment: Comment) {
    this.commentService.likeComment(comment.id).subscribe(updatedComment => {
      if (updatedComment) {
        comment.likes = updatedComment.likes;
      }
    });
  }

  canDeleteComment(comment: Comment): boolean {
    if (!this.authService.isLoggedIn()) return false;
    const currentSession = this.authService.currentUser();
    if (!currentSession) return false;

    const isCommentAuthor = currentSession.username === comment.author || currentSession.name === comment.author;
    const isPostAuthor = this.postAuthorId === currentSession.userId;
    
    return isCommentAuthor || isPostAuthor;
  }

  onDeleteComment(comment: Comment) {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.commentService.deleteComment(comment.id).subscribe(() => {
        this.comments = this.comments.filter(c => c.id !== comment.id);
      });
    }
  }
}
