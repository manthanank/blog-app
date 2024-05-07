import { Component, inject } from '@angular/core';
import { BlogsService } from '../../../core/services/blogs.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Blog } from '../../../core/models/blog.model';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Location } from '@angular/common';
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

  blogsService = inject(BlogsService);
  route = inject(ActivatedRoute);
  location = inject(Location);

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
      },
      error: (error: any) => {
        console.error('An error occurred while fetching the blog:', error);
        // Handle the error here, e.g. display an error message to the user
      },
    });
  }

  calculateHeight(): number {
    // Adjust this value according to your design and font size
    const lineHeight = 24; // Height of one line in pixels
    // Calculate height based on number of lines
    return this.lines * lineHeight;
  }

  goBack() {
    this.location.back();
  }
}
