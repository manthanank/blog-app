import { Component, OnInit, inject } from '@angular/core';
import { BlogsService } from '../../../services/blogs.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Blog } from '../../../models/blog.model';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [NgFor, RouterLink, DatePipe, NgIf],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss',
})
export class BlogListComponent implements OnInit {
  private authStatusSubscription: Subscription = new Subscription();
  blogs: Blog[] = [];
  isLoggedIn: boolean = false;
  auth = inject(AuthService);
  currentUserId: string = '';
  blogsService = inject(BlogsService);

  ngOnInit() {
    this.currentUserId = this.auth.getUserId();
    this.authStatusSubscription = this.auth
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
      });
    // Check authentication status on component initialization
    this.isLoggedIn = this.auth.getIsAuth();
    this.blogsService.getBlogs().subscribe((data: any) => {
      this.blogs = data.posts;
      console.log(this.blogs);
    });
  }

  deleteBlog(id: string) {
    this.blogsService.deleteBlog(id).subscribe((data: any) => {
      this.blogsService.getBlogs().subscribe((data: any) => {
        this.blogs = data.posts;
      });
    });
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }
}
