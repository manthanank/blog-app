import { Component, inject, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { PaginatedPosts } from '../../models/post.model';
import { SearchBarComponent } from '../shared/search-bar.component';
import { PaginationComponent } from '../shared/pagination.component';
import { PostCardComponent } from './post-card/post-card.component';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    AsyncPipe,
    PostCardComponent,
    SearchBarComponent,
    PaginationComponent,
  ],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-3xl font-bold mb-8">Latest Posts</h2>

      <app-search-bar (search)="onSearch($event)" />

      @if (posts$ | async; as postResult) { @if (postResult.items.length > 0) {
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        @for (post of postResult.items; track $index) {
        <app-post-card [post]="post" />
        }
      </div>

      @if (postResult.totalPages > 1) {
      <app-pagination
        [currentPage]="postResult.currentPage"
        [totalPages]="postResult.totalPages"
        [totalItems]="postResult.totalItems"
        (pageChange)="onPageChange($event)"
      />
      } } @else {
      <div class="text-center py-12">
        <p class="text-gray-600">
          No posts found matching your search criteria.
        </p>
      </div>
      } }
    </div>
  `,
})
export class PostListComponent implements OnInit {
  private pageSubject = new BehaviorSubject<number>(1);
  private searchSubject = new BehaviorSubject<string>('');
  private readonly pageSize = 6;

  posts$: Observable<PaginatedPosts>;

  private postService = inject(PostService);

  constructor() {
    this.posts$ = this.createPostsStream();
  }
  
  ngOnInit() {
    this.loadPosts();
  }

  onPageChange(page: number) {
    this.pageSubject.next(page);
  }

  onSearch(query: string) {
    this.searchSubject.next(query);
    this.pageSubject.next(1); // Reset to first page when searching
  }

  private createPostsStream(): Observable<PaginatedPosts> {
    return this.searchSubject.pipe(
      switchMap((searchQuery) =>
        this.pageSubject.pipe(
          switchMap((page) =>
            this.postService.getPosts(page, this.pageSize, searchQuery)
          )
        )
      )
    );
  }

  private loadPosts() {
    this.pageSubject.next(1);
  }
}
