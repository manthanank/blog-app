import { Component, OnInit, inject } from '@angular/core';
import { BlogsService } from '../../core/services/blogs.service';
import { LatestBlogs } from '../../core/models/blog.model';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, DatePipe, RouterLink, NgIf, ScrollTopModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private authStatusSubscription: Subscription = new Subscription();
  latestBlogs: LatestBlogs[] = [];
  isLoggedIn: boolean = false;
  isLoadingLatestBlogs: boolean = false;
  auth = inject(AuthService);
  currentUserId: string = '';
  blogsService = inject(BlogsService);

  constructor() {}

  ngOnInit() {
    this.currentUserId = this.auth.getUserId();
    this.authStatusSubscription = this.auth.getAuthStatusListener().subscribe({
      next: (isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
      },
      error: (error) => {
        console.error(
          'Error occurred while getting authentication status:',
          error
        );
      },
    });
    // Check authentication status on component initialization
    this.isLoggedIn = this.auth.getIsAuth();

    this.isLoadingLatestBlogs = true;
    this.blogsService.getLatestBlogs().subscribe({
      next: (data: any) => {
        this.latestBlogs = data;
        this.isLoadingLatestBlogs = false;
      },
      error: (error: any) => {
        console.error('Error occurred while fetching latest blogs:', error);
        this.isLoadingLatestBlogs = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }
}
