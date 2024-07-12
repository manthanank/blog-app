import { Component, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { BlogsService } from '../../../core/services/blogs.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsersService } from '../../../core/services/users.service';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { User } from '../../../core/models/user.model';
import { Blog } from '../../../core/models/blog.model';

@Component({
  selector: 'app-view-profile',
  standalone: true,
  imports: [RouterLink, DatePipe, BreadcrumbModule],
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.scss',
})
export class ViewProfileComponent implements OnInit {
  private authStatusSubscription: Subscription = new Subscription();

  auth = inject(AuthService);
  user = inject(UsersService);
  blogsService = inject(BlogsService);
  route = inject(ActivatedRoute);
  username: string = '';
  isLoggedIn: boolean = false;
  currentUserName: string = '';
  profile: User = {
    _id: '',
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    __v: 0,
  };
  blogs: Blog[] = [];
  isLoading: boolean = false;
  isLoadingProfile: boolean = false;
  isLoadingFeaturedBlogs: boolean = false;
  featuredBlogs: Blog[] = [];
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  constructor() {}

  ngOnInit() {
    this.items = [{ label: 'Profile' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.route.params.subscribe({
      next: (params: any) => {
        this.username = params.username;
        this.loadDataForUsername(this.username);
      },
      error: (error: any) => {
        console.error('Error fetching route params:', error);
      },
    });
    this.isLoading = true;
    this.currentUserName = this.auth.getUserName();
    // console.log('Current user name:', this.currentUserName);
    this.authStatusSubscription = this.auth.getAuthStatusListener().subscribe({
      next: (isAuthenticated: boolean) => {
        this.isLoggedIn = isAuthenticated;
      },
      error: (error: any) => {
        console.error('Error subscribing to authentication status:', error);
      },
    });
  }

  loadDataForUsername(username: string) {
    this.isLoadingProfile = true;
    this.isLoadingFeaturedBlogs = true;

    // Fetch user details
    this.user.getUserDetails(username).subscribe({
      next: (data: any) => {
        this.profile = data;
        this.isLoadingProfile = false;
      },
      error: (error: any) => {
        console.error('Error fetching user details:', error);
        this.isLoadingProfile = false;
      },
    });

    // Fetch blogs
    this.blogsService.getBlogByUsername(username).subscribe({
      next: (data: any) => {
        this.blogs = data;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error fetching blogs:', error);
        this.isLoading = false;
      },
    });

    // Fetch featured blogs
    this.blogsService.getFeaturedBlogsByUsername(username).subscribe({
      next: (data: any) => {
        this.featuredBlogs = data;
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
