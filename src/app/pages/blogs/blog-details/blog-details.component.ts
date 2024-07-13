import { Component, inject } from '@angular/core';
import { BlogsService } from '../../../core/services/blogs.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Blog } from '../../../core/models/blog.model';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ScrollTopModule } from 'primeng/scrolltop';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-blog-details',
  standalone: true,
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss',
  imports: [DatePipe, RouterLink, BreadcrumbModule, ScrollTopModule],
})
export class BlogDetailsComponent {
  blog: Blog = {} as Blog;
  id: string = '';
  loading: boolean = false;
  content: string = '';
  lines: number = 0;
  authorId: string = '';
  blogsService = inject(BlogsService);
  route = inject(ActivatedRoute);
  location = inject(Location);
  auth = inject(AuthService);
  sanitizer = inject(DomSanitizer);
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  showConfirmDialog = false;
  readingTime: string = '';
  sanitizedContent: SafeHtml | null = null;

  ngOnInit() {
    this.id = this.route.snapshot.url[1].path;
    this.items = [
      { label: 'Blogs', routerLink: '/blogs' },
      { label: 'Blog Details' },
    ];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.loading = true;
    this.blogsService.getBlog(this.id).subscribe({
      next: (data: any) => {
        this.loading = false;
        this.blog = data;
        this.content = this.blog.content;
        this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(this.content);
        this.readingTime = this.blogsService.calculateReadingTime(this.content);
        this.lines = this.content.trim().split('\n').length;
        this.authorId = this.blog.authorId;
      },
      error: (error: any) => {
        console.error('An error occurred while fetching the blog:', error);
        // Handle the error here, e.g. display an error message to the user
      },
    });

    // Increment visit count if the blog has not been visited before
    if (!localStorage.getItem('visited_blog_' + this.id)) {
      localStorage.setItem('visited_blog_' + this.id, 'true');
      this.blogsService.visitCount(this.id).subscribe({
        next: (res) => {
          // console.log('Blog visit count incremented successfully!');
        },
        error: (error) => {
          console.error('Error incrementing blog visit count:', error);
          // Handle the error here, e.g. show an error message to the user
        },
      });
    }
  }

  deleteBlog() {
    this.blogsService.deleteBlog(this.id).subscribe({
      next: (res) => {
        // console.log('Blog deleted successfully!');
        this.location.back();
        this.showConfirmDialog = false;
      },
      error: (error) => {
        console.error('Error deleting blog:', error);
        // Handle the error here, e.g. show an error message to the user
      },
    });
  }
}
