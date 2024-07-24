import { Component, OnInit, inject } from '@angular/core';
import { BlogsService } from '../../../core/services/blogs.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Blog } from '../../../core/models/blog.model';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as BlogsActions from '../../../core/store/blogs.actions';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss',
  imports: [
    RouterLink,
    DatePipe,
    BreadcrumbModule,
    FormsModule,
    ReactiveFormsModule,
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
  totalBlogPosts: number = 100; // This could be dynamic based on server response
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10; // Default page size

  ngOnInit() {
    this.items = [{ label: 'Blogs' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.currentUserId = this.auth.getUserId();
    this.authStatusSubscription = this.auth.getAuthStatusListener().subscribe({
      next: (isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
      },
      error: (error) => {
        console.error('Error occurred:', error);
      },
    });
    this.isLoggedIn = this.auth.getIsAuth();
    this.loadBlogs();
    // this.store.select('blogs').subscribe({
    //   next: (data: any) => {
    //     this.blogs = data.blogs.posts;
    //     this.loading = data.loading;
    //     this.error = data.error;
    //     this.totalBlogPosts = data.blogs?.next?.total; // Assuming the response includes total posts
    //   },
    //   error: (error) => {
    //     console.error('Error occurred:', error);
    //   },
    // });
  }

  loadBlogs(): void {
    const page = this.currentPage;
    // this.store.dispatch(
    //   BlogsActions.loadBlogs({
    //     limit: this.pageSize,
    //     page: page,
    //     search: this.searchTerm,
    //   })
    // );
    this.blogsService
      .getAllBlogs(this.pageSize, page, this.searchTerm)
      .subscribe({
        next: (data: any) => {
          this.blogs = data.posts;
          this.loading = false;
          this.error = null;
          this.totalBlogPosts = data.blogs?.next?.total; // Assuming the response includes total posts
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
          console.error('Error occurred:', error);
        },
      });
  }

  searchBlogs(): void {
    this.currentPage = 1; // Reset to first page on search
    this.loadBlogs();
  }

  prevPage() {
    this.currentPage--;
    this.loadBlogs();
  }

  nextPage() {
    // const totalPages = Math.ceil(this.totalBlogPosts / this.pageSize);
    // if (this.currentPage < totalPages) {
    //   this.currentPage++;
    //   this.loadBlogs();
    // }
    if (this.blogs.length < this.pageSize) {
      return;
    }
    this.currentPage++;
    this.loadBlogs();
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }
}
