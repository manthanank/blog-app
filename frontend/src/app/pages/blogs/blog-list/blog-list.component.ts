import { Component, OnInit, inject } from '@angular/core';
import { BlogsService } from '../../../services/blogs.service';
import { DatePipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Blog } from '../../../models/blog.model';
@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [NgFor, RouterLink, DatePipe],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent implements OnInit{

  blogs: Blog[] = [];

  blogsService = inject(BlogsService);

  ngOnInit() {
    this.blogsService.getBlogs().subscribe((data: any) => {
      this.blogs = data.posts;
      console.log(this.blogs);
    });
  }
}
