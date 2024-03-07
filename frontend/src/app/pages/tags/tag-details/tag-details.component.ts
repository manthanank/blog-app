import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogsService } from '../../../services/blogs.service';
import { Blog } from '../../../models/blog.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-tag-details',
  standalone: true,
  imports: [NgFor, DatePipe, RouterLink, NgIf],
  templateUrl: './tag-details.component.html',
  styleUrl: './tag-details.component.scss',
})
export class TagDetailsComponent {
  private authStatusSubscription: Subscription = new Subscription();
  blogs: Blog[] = [];

  blogsService = inject(BlogsService);
  route = inject(ActivatedRoute);
  id: string = '';
  currentUserId: string = '';
  isLoggedIn: boolean = false;
  auth = inject(AuthService);

  ngOnInit() {
    this.currentUserId = this.auth.getUserId();
    this.authStatusSubscription = this.auth
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
      });
    // Check authentication status on component initialization
    this.isLoggedIn = this.auth.getIsAuth();
    this.id = this.route.snapshot.params['tag'];
    this.blogsService.getBlogByTag(this.id).subscribe((data: any) => {
      this.blogs = data;
      console.log(this.blogs);
    });
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }
}
