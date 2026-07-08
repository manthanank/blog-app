import { Component, EventEmitter, inject, Input, Output, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostForm } from '../../models/post-form.model';
import { Post } from '../../models/post.model';
import Quill from 'quill';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6">
      <div>
        <label for="title" class="block text-sm font-semibold text-gray-700 mb-1">Title</label>
        <input
          type="text"
          id="title"
          formControlName="title"
          class="block w-full px-4 py-2.5 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          placeholder="Enter a catchy title"
        />
        @if (form.get('title')?.touched && form.get('title')?.invalid) {
          <p class="mt-1 text-xs text-red-600">Title is required and must be at least 3 characters</p>
        }
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Content</label>
        <div class="border border-gray-300 rounded-xl overflow-hidden shadow-sm">
          <div #editor style="height: 350px;" class="bg-white"></div>
        </div>
        @if (form.get('content')?.touched && form.get('content')?.invalid) {
          <p class="mt-1 text-xs text-red-600">Content must be at least 10 characters</p>
        }
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="tags" class="block text-sm font-semibold text-gray-700 mb-1">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            formControlName="tags"
            class="block w-full px-4 py-2.5 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            placeholder="angular, web, development"
          />
        </div>

        <div>
          <label for="status" class="block text-sm font-semibold text-gray-700 mb-1">Status</label>
          <select
            id="status"
            formControlName="status"
            class="block w-full px-4 py-2.5 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      <div class="flex justify-end space-x-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          (click)="onCancel.emit()"
          class="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          [disabled]="!form.valid"
          class="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
        >
          {{ post ? 'Update' : 'Create' }} Post
        </button>
      </div>
    </form>
  `
})
export class PostFormComponent implements OnInit, AfterViewInit {
  @Input() post?: Post;
  @Output() save = new EventEmitter<PostForm>();
  @Output() onCancel = new EventEmitter<void>();

  @ViewChild('editor', { static: true }) editorElementRef!: ElementRef;
  private quill!: Quill;

  form: FormGroup;
  private fb = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      tags: [''],
      status: ['published', [Validators.required]]
    });
  }

  ngOnInit() {
    if (this.post) {
      this.form.patchValue({
        title: this.post.title,
        content: this.post.content,
        tags: this.post.tags.join(', '),
        status: this.post.status || 'published'
      });
    }
  }

  ngAfterViewInit() {
    this.quill = new Quill(this.editorElementRef.nativeElement, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'color': [] }, { 'background': [] }],
          ['clean']
        ]
      }
    });

    if (this.post) {
      this.quill.root.innerHTML = this.post.content;
    }

    this.quill.on('text-change', () => {
      const html = this.quill.root.innerHTML;
      const text = this.quill.getText().trim();
      this.form.get('content')?.setValue(text ? html : '');
      this.form.get('content')?.markAsTouched();
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;
      const postForm: PostForm = {
        title: formValue.title,
        content: formValue.content,
        tags: formValue.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean),
        status: formValue.status
      };
      this.save.emit(postForm);
    }
  }
}