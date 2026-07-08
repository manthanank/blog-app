import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="commentForm" (ngSubmit)="onSubmit()" class="mb-8">
      @if (!authService.isLoggedIn()) {
        <div class="mb-4">
          <label for="author" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            id="author"
            formControlName="author"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your name"
          />
          @if (commentForm.get('author')?.touched && commentForm.get('author')?.invalid) {
            <p class="mt-1 text-xs text-red-600">Please enter your name (min 2 characters)</p>
          }
        </div>
      } @else {
        <div class="mb-4 flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
          <div class="h-6 w-6 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
            {{ authService.getName() ? authService.getName()![0].toUpperCase() : 'U' }}
          </div>
          <span>Commenting as <strong class="text-gray-800">{{ authService.getName() }}</strong> (&#64;{{ authService.getUserName() }})</span>
        </div>
      }
      
      <div class="mb-4">
        <label for="content" class="block text-sm font-medium text-gray-700 mb-1">Comment</label>
        <textarea
          id="content"
          formControlName="content"
          rows="3"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Share your thoughts..."
        ></textarea>
        @if (commentForm.get('content')?.touched && commentForm.get('content')?.invalid) {
          <p class="mt-1 text-xs text-red-600">Please enter a comment (min 5 characters)</p>
        }
      </div>

      <button
        type="submit"
        [disabled]="!commentForm.valid"
        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
               transition-colors duration-200"
      >
        Post Comment
      </button>
    </form>
  `
})
export class CommentFormComponent implements OnInit {
  @Output() submitComment = new EventEmitter<{author: string; content: string}>();
  
  commentForm: FormGroup;
  authService = inject(AuthService);
  private fb = inject(FormBuilder);

  constructor() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      content: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit() {
    this.updateAuthorField();
  }

  updateAuthorField() {
    if (this.authService.isLoggedIn()) {
      const name = this.authService.getName() || this.authService.getUserName() || 'Anonymous';
      this.commentForm.get('author')?.setValue(name);
      this.commentForm.get('author')?.clearValidators();
      this.commentForm.get('author')?.updateValueAndValidity();
    } else {
      this.commentForm.get('author')?.setValidators([Validators.required, Validators.minLength(2)]);
      this.commentForm.get('author')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.commentForm.valid) {
      this.submitComment.emit(this.commentForm.value);
      this.commentForm.reset();
      this.updateAuthorField();
    }
  }
}