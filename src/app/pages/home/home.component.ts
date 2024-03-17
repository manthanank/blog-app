import { Component, OnInit, inject } from '@angular/core';
import { BlogsService } from '../blogs/blogs.service';
import { HttpClientModule } from '@angular/common/http';
import { Blogs, FeaturedBlogs, RecentBlogs } from '../../models/blog.model';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, DatePipe, RouterLink, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {

  private authStatusSubscription: Subscription = new Subscription();
  featuredBlogs: FeaturedBlogs[] = [];
  recentBlogs: RecentBlogs[] = [];
  isLoggedIn: boolean = false;
  isLoading: boolean = false;
  auth = inject(AuthService);
  currentUserId: string = '';
  blogsService = inject(BlogsService);

  constructor() {}

  ngOnInit() {
    this.currentUserId = this.auth.getUserId();
    this.authStatusSubscription = this.auth
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
      });
    // Check authentication status on component initialization
    this.isLoggedIn = this.auth.getIsAuth();

    this.isLoading = true;
    this.blogsService.getFeaturedBlogs().subscribe((data: any) => {
      this.featuredBlogs = data;
      // console.log(this.featuredBlogs);
      this.isLoading = false;
    });
    this.blogsService.getRecentBlogs().subscribe((data: any) => {
      this.recentBlogs = data;
      // console.log(this.recentBlogs);
      this.isLoading = false;
    });
  }

  deleteBlog(id: string) {
    this.blogsService.deleteBlog(id).subscribe((data: any) => {
      this.blogsService.getFeaturedBlogs().subscribe((data: any) => {
        this.featuredBlogs = data;
      });
    });
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }
}
