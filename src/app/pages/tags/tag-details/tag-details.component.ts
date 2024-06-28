import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogsService } from '../../../core/services/blogs.service';
import { Blog } from '../../../core/models/blog.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { TagsService } from '../tags.service';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
@Component({
  selector: 'app-tag-details',
  standalone: true,
  templateUrl: './tag-details.component.html',
  styleUrl: './tag-details.component.scss',
  imports: [NgFor, DatePipe, RouterLink, NgIf, BreadcrumbModule],
})
export class TagDetailsComponent {
  private authStatusSubscription: Subscription = new Subscription();
  blogs: Blog[] = [];
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  blogsService = inject(BlogsService);
  tagsService = inject(TagsService);
  route = inject(ActivatedRoute);
  id: string = '';
  currentUserId: string = '';
  isLoggedIn: boolean = false;
  auth = inject(AuthService);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['tag'];
    });
    this.items = [{ label: 'Tags', routerLink: '/tags' }, { label: this.id }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
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
    this.id = this.route.snapshot.params['tag'];
    this.tagsService.getBlogByTag(this.id).subscribe({
      next: (data: any) => {
        this.blogs = data;
      },
      error: (error: any) => {
        console.error('Error occurred while getting blogs by tag:', error);
      },
    });
  }

  deleteBlog(id: string) {
    this.blogsService.deleteBlog(id).subscribe((data: any) => {
      this.tagsService.getBlogByTag(this.id).subscribe((data: any) => {
        this.blogs = data;
      });
    });
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }
}
