import { Component, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { BlogsService } from '../../../core/services/blogs.service';
import { NgFor, DatePipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../shared/breadcrumbs/breadcrumbs.component';

export type Blogs = Blog[];
export interface Profile {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  __v: number;
}


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
  selector: 'app-view-profile',
  standalone: true,
  imports: [NgFor, RouterLink, DatePipe, NgIf, BreadcrumbsComponent],
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.scss',
})
export class ViewProfileComponent implements OnInit {
  private authStatusSubscription: Subscription = new Subscription();
  isLoggedIn: boolean = false;
  auth = inject(AuthService);
  currentUserId: string = '';
  currentUserName: string = '';
  blogsService = inject(BlogsService);
  profile: Profile = {
    _id: '',
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    __v: 0,
  };
  blogs: Blogs = [];
  isLoading: boolean = false;
  isLoadingProfile: boolean = false;
  isLoadingFeaturedBlogs: boolean = false;
  featuredBlogs: Blogs = [];

  constructor() {}

  ngOnInit() {
    this.isLoading = true;
    this.isLoadingProfile = true;
    this.currentUserId = this.auth.getUserId();
    this.currentUserName = this.auth.getUserName();
    this.authStatusSubscription = this.auth.getAuthStatusListener().subscribe({
      next: (isAuthenticated: boolean) => {
        this.isLoggedIn = isAuthenticated;
      },
      error: (error: any) => {
        console.error('Error subscribing to authentication status:', error);
      },
    });
    // Check authentication status on component initialization
    this.isLoggedIn = this.auth.getIsAuth();
    this.auth.getUserDetails().subscribe({
      next: (data: any) => {
        // console.log(data);
        this.profile = data;
        this.isLoadingProfile = false;
      },
      error: (error: any) => {
        console.error('Error fetching user details:', error);
        this.isLoadingProfile = false;
      },
    });
    this.blogsService.getBlogByUsername(this.currentUserName).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.blogs = data;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error fetching blogs:', error);
        this.isLoading = false;
      },
    });
    this.blogsService.getFeaturedBlogsByUsername(this.currentUserId).subscribe({
      next: (data: any) => {
        this.featuredBlogs = data;
        // console.log(this.featuredBlogs);
        this.isLoadingFeaturedBlogs = false;
      },
      error: (error: any) => {
        console.error('Error fetching featured blogs:', error);
        this.isLoadingFeaturedBlogs = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }
}
