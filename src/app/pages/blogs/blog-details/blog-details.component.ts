import { Component, inject } from '@angular/core';
import { BlogsService } from '../../../core/services/blogs.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Blog } from '../../../core/models/blog.model';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Location } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ScrollTopModule } from 'primeng/scrolltop';
@Component({
  selector: 'app-blog-details',
  standalone: true,
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss',
  imports: [NgFor, DatePipe, NgIf, RouterLink, NgClass, BreadcrumbModule, ScrollTopModule],
})
export class BlogDetailsComponent {
  blog: Blog = {
    _id: '',
    title: '',
    desc: '',
    content: '',
    author: '',
    authorId: '',
    createdAt: '',
    __v: 0,
    featured: false,
    tags: [],
  };
  id: string = '';
  loading: boolean = false;
  content: string = '';
  contentLength: number = 0;
  lines: number = 0;
  authorId: string = '';
  blogsService = inject(BlogsService);
  route = inject(ActivatedRoute);
  location = inject(Location);
  auth = inject(AuthService);
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  showConfirmDialog = false;

  ngOnInit() {
    this.id = this.route.snapshot.url[1].path;
    this.items = [{ label: 'Blogs', routerLink:'/blogs' }, { label: 'Blog Details'}];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.loading = true;
    this.blogsService.getBlog(this.id).subscribe({
      next: (data: any) => {
        this.loading = false;
        this.blog = data;
        // console.log(this.blog);
        this.content = this.blog.content;
        // console.log(this.content);
        this.contentLength = this.content.length;
        // console.log(this.contentLength);
        this.lines = this.content.trim().split('\n').length;
        // console.log(this.lines);
        this.authorId = this.blog.authorId;
        // console.log(this.authorId);
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
