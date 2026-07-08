import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { PostCardComponent } from '../post-list/post-card/post-card.component';
import { ClearTagButtonComponent } from './clear-tag-button.component';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [PostCardComponent, ClearTagButtonComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Browse by Tag</h1>
        @if (selectedTag) {
        <app-clear-tag-button (clearTag)="clearTagSelection()" />
        }
      </div>

      <div class="flex flex-wrap gap-2 mb-8">
        @for (tag of uniqueTags; track $index) {
        <button
          (click)="onTagSelect(tag)"
          [class.bg-blue-600]="selectedTag === tag"
          [class.text-white]="selectedTag === tag"
          [class.hover:bg-blue-700]="selectedTag === tag"
          [class.bg-blue-50]="selectedTag !== tag"
          [class.text-blue-700]="selectedTag !== tag"
          [class.hover:bg-blue-100]="selectedTag !== tag"
          class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium
                   transition-colors duration-200 ease-in-out
                   border border-blue-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
              clip-rule="evenodd"
            />
          </svg>
          {{ tag }}
        </button>
        }
      </div>

      @if (selectedTag) {
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="flex items-center space-x-2">
          <span
            class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium
                         bg-blue-600 text-white border border-blue-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                clip-rule="evenodd"
              />
            </svg>
            {{ selectedTag }}
          </span>
          <span class="text-gray-600">
            {{ filteredPosts.length }}
            {{ filteredPosts.length === 1 ? 'post' : 'posts' }}
          </span>
        </div>
      </div>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        @for (post of filteredPosts; track $index) {
        <app-post-card [post]="post" />
        }
      </div>
      } @else {
      <div class="text-center py-12 text-gray-600">
        Select a tag to view related posts
      </div>
      }
    </div>
  `,
})
export class TagsComponent implements OnInit {
  posts: Post[] = [];
  uniqueTags: string[] = [];
  selectedTag: string | null = null;
  filteredPosts: Post[] = [];

  private postService = inject(PostService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {}

  ngOnInit() {
    this.loadPosts();
    this.route.queryParams.subscribe((params) => {
      const tag = params['tag'];
      if (tag) {
        this.selectTag(tag);
      }
    });
  }

  private loadPosts() {
    this.postService.getPosts(1, 100).subscribe((result) => {
      this.posts = result.items;
      this.uniqueTags = [
        ...new Set(this.posts.flatMap((post) => post.tags)),
      ].sort();
      this.updateFilteredPosts();
    });
  }

  onTagSelect(tag: string): void {
    if (this.selectedTag === tag) {
      this.clearTagSelection();
    } else {
      this.selectTag(tag);
      this.updateQueryParams(tag);
    }
  }

  clearTagSelection(): void {
    this.selectedTag = null;
    this.filteredPosts = [];
    this.updateQueryParams(null);
  }

  private selectTag(tag: string): void {
    this.selectedTag = tag;
    this.updateFilteredPosts();
  }

  private updateFilteredPosts(): void {
    this.filteredPosts = this.selectedTag
      ? this.posts.filter((post) => post.tags.includes(this.selectedTag!))
      : [];
  }

  private updateQueryParams(tag: string | null): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: tag ? { tag } : {},
      queryParamsHandling: 'merge',
    });
  }
}
