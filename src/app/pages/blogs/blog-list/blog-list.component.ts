import { Component, OnInit, inject } from '@angular/core';
import { BlogsService } from '../../../core/services/blogs.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Blog } from '../../../core/models/blog.model';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as BlogsActions from '../../../core/store/blogs.actions';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
@Component({
  selector: 'app-blog-list',
  standalone: true,
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss',
  imports: [
    NgFor,
    RouterLink,
    DatePipe,
    NgIf,
    BreadcrumbModule
  ],
})
export class BlogListComponent implements OnInit {
  private authStatusSubscription: Subscription = new Subscription();
  blogs: Blog[] = [];
  isLoggedIn: boolean = false;
  auth = inject(AuthService);
  currentUserId: string = '';
  blogsService = inject(BlogsService);
  store = inject(Store);
  loading: boolean = false;
  error: any = null;
  totalBlogPosts: number = 100;
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  ngOnInit() {
    this.items = [{ label: 'Blogs' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.currentUserId = this.auth.getUserId();
    this.authStatusSubscription = this.auth.getAuthStatusListener().subscribe({
      next: (isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
      },
      error: (error) => {
        // Handle error here
        console.error('Error occurred:', error);
      },
    });
    // Check authentication status on component initialization
    this.isLoggedIn = this.auth.getIsAuth();
    this.store.dispatch(BlogsActions.loadBlogs());
    this.store.select('blogs').subscribe({
      next: (data: any) => {
        this.blogs = data.blogs.posts;
        this.loading = data.loading;
        this.error = data.error;
      },
      error: (error) => {
        // Handle error here
        console.error('Error occurred:', error);
      },
    });
  }

  loadBlogPosts(page: number): void {
    // Load blog posts for the given page
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }
}
