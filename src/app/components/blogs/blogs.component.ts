import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { SearchBarComponent } from '../shared/search-bar.component';
import { PaginationComponent } from '../shared/pagination.component';
import { PaginatedResult } from '../../models/pagination.model';
import { PostCardComponent } from '../post-list/post-card/post-card.component';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [PostCardComponent, SearchBarComponent, PaginationComponent],
  template: `
    <div class="container mx-auto px-4 py-6">
      <!-- Header -->
      <div
        class="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6"
      >
        <div>
          <h2
            class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Explore Articles
          </h2>
          <p class="mt-1 text-gray-600">
            Discover stories, thinking, and expertise.
          </p>
        </div>
        <button
          (click)="onCreatePost()"
          class="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium
                 bg-gradient-to-r from-blue-600 to-purple-600 text-white
                 hover:from-blue-700 hover:to-purple-700
                 transition-all duration-200 shadow-md hover:shadow-lg
                 transform hover:-translate-y-0.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-1.5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          Write an Article
        </button>
      </div>

      <!-- Search -->
      <div class="mb-6">
        <app-search-bar (search)="onSearch($event)" />
      </div>

      <!-- Content -->
      @if (posts.length > 0) {
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        @for (post of posts; track $index) {
        <app-post-card [post]="post" />
        }
      </div>

      @if (totalPages > 1) {
      <app-pagination
        [currentPage]="currentPage"
        [totalPages]="totalPages"
        (pageChange)="onPageChange($event)"
      />
      } }

      <!-- Empty State -->
      @else {
      <div class="text-center py-12 bg-white rounded-2xl shadow-sm">
        <div class="max-w-md mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-20 w-20 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
          <h3 class="text-xl font-bold text-gray-900 mb-2">
            No articles found
          </h3>
          <p class="text-gray-600 mb-4">
            We couldn't find any articles matching your search criteria. Try
            adjusting your filters or create a new article.
          </p>
          <button
            (click)="onCreatePost()"
            class="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium
                        bg-gradient-to-r from-blue-600 to-purple-600 text-white
                        hover:from-blue-700 hover:to-purple-700
                        transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Write Your First Article
          </button>
        </div>
      </div>
      }
    </div>
  `,
})
export class BlogsComponent implements OnInit {
  posts: Post[] = [];
  currentPage = 1;
  pageSize = 6;
  totalPages = 1;
  searchQuery = '';

  private postService = inject(PostService);
  private router = inject(Router);

  constructor() {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.postService
      .getPosts(this.currentPage, this.pageSize, this.searchQuery)
      .subscribe((result: PaginatedResult<Post>) => {
        this.posts = result.items;
        this.totalPages = result.totalPages;
        this.currentPage = result.currentPage;
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadPosts();
  }

  onSearch(query: string) {
    this.searchQuery = query;
    this.currentPage = 1;
    this.loadPosts();
  }

  onCreatePost() {
    this.router.navigate(['/blogs/new']);
  }

  trackByPostId(index: number, post: Post) {
    return post.id;
  }
}
