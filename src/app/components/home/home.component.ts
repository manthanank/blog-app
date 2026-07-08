import { Component, inject, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { SectionHeaderComponent } from './section-header.component';
import { LatestPostsComponent } from './latest-posts/latest-posts.component';
import { ViewAllButtonComponent } from './view-all-button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SectionHeaderComponent,
    LatestPostsComponent,
    ViewAllButtonComponent
  ],
  template: `
    <div class="container mx-auto px-4 py-8">
      <app-section-header title="Latest Posts" />
      <app-latest-posts [posts]="latestPosts" />
      <app-view-all-button />
    </div>
  `
})
export class HomeComponent implements OnInit {
  latestPosts: Post[] = [];

  private postService = inject(PostService);

  constructor() {}

  ngOnInit() {
    this.loadLatestPosts();
  }

  private loadLatestPosts() {
    this.postService
      .getPosts(1, 6)
      .subscribe((result) => {
        this.latestPosts = result.items;
      });
  }
}