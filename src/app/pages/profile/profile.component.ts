import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { BlogsService } from '../blogs/blogs.service';
import { Subscription } from 'rxjs';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';

export interface Profile {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  __v: number;
}

export type Blogs = Blog[];

export interface Blog {
  _id: string;
  slug: string;
  title: string;
  desc: string;
  content: string;
  author: string;
  authorId: string;
  tags: string[];
  createdAt: string;
  featured: boolean;
  __v: number;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  imports: [NgFor, RouterLink, DatePipe, NgIf, BreadcrumbsComponent],
})
export class ProfileComponent implements OnInit {
  private authStatusSubscription: Subscription = new Subscription();
  isLoggedIn: boolean = false;
  auth = inject(AuthService);
  currentUserId: string = '';
  blogsService = inject(BlogsService);
  profile: Profile = {
    _id: '',
    email: '',
    firstName: '',
    lastName: '',
    __v: 0,
  };
  blogs: Blogs = [];
  isLoading: boolean = false;
  isLoadingProfile: boolean = false;
  isLoadingFeaturedBlogs: boolean = false;
  isLoadingRecentBlogs: boolean = false;
  featuredBlogs: Blogs = [];
  recentBlogs: Blogs = [];

  constructor() {}

  ngOnInit() {
    this.isLoading = true;
    this.isLoadingProfile = true;
    this.currentUserId = this.auth.getUserId();
    this.authStatusSubscription = this.auth
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
      });
    // Check authentication status on component initialization
    this.isLoggedIn = this.auth.getIsAuth();
    this.auth.getUserDetails().subscribe((data: any) => {
      // console.log(data);
      this.profile = data;
      this.isLoadingProfile = false;
    });
    this.blogsService
      .getBlogByAuthor(this.currentUserId)
      .subscribe((data: any) => {
        // console.log(data);
        this.blogs = data;
        this.isLoading = false;
      });
    this.blogsService.getFeaturedBlogsByAuthor(this.currentUserId).subscribe((data: any) => {
      this.featuredBlogs = data;
      // console.log(this.featuredBlogs);
      this.isLoadingFeaturedBlogs = false;
    });
    this.blogsService.getRecentBlogsByAuthor(this.currentUserId).subscribe((data: any) => {
      this.recentBlogs = data;
      // console.log(this.recentBlogs);
      this.isLoadingRecentBlogs = false;
    });
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }
}
