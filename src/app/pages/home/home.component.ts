import { Component, OnInit, inject } from '@angular/core';
import { BlogsService } from '../../core/services/blogs.service';
import { LatestBlogs } from '../../core/models/blog.model';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
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
  latestBlogs: LatestBlogs[] = [];
  isLoggedIn: boolean = false;
  isLoadingLatestBlogs: boolean = false;
  isLoadingRecentBlogs: boolean = false;
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

    this.isLoadingLatestBlogs = true;
    this.isLoadingRecentBlogs = true;
    this.blogsService.getLatestBlogs().subscribe((data: any) => {
      this.latestBlogs = data;
      // console.log(this.latestBlogs);
      this.isLoadingLatestBlogs = false;
    });
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }
}
