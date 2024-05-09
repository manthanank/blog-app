import { Component, inject } from '@angular/core';
import { BlogsService } from '../../../core/services/blogs.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Blog } from '../../../core/models/blog.model';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Location } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-blog-details',
  standalone: true,
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss',
  imports: [NgFor, DatePipe, NgIf, RouterLink, NgClass],
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
  loading : boolean = false;
  content: string = '';
  contentLength: number = 0;
  lines : number = 0;
  authorId: string = '';
  blogsService = inject(BlogsService);
  route = inject(ActivatedRoute);
  location = inject(Location);
  auth = inject(AuthService);

  ngOnInit() {
    this.id = this.route.snapshot.url[1].path;
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
  }

  calculateHeight(): number {
    const baseLineHeight = 32; // Default line height
    let adjustedLineHeight = baseLineHeight;

    // Adjust line height based on conditions (e.g., number of lines, screen size)
    if (this.lines > 10) {
      adjustedLineHeight = baseLineHeight * 1.2; // Increase for longer content
    } else if (window.innerWidth < 768) {
      adjustedLineHeight = baseLineHeight * 0.8; // Decrease for smaller screens
    }
    return this.lines * adjustedLineHeight;
  }

  deleteBlog() {
    this.blogsService.deleteBlog(this.id).subscribe({
      next: (res) => {
        // console.log('Blog deleted successfully!');
        this.location.back();
      },
      error: (error) => {
        console.error('Error deleting blog:', error);
        // Handle the error here, e.g. show an error message to the user
      },
    });
  }

  goBack() {
    this.location.back();
  }
}
