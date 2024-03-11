import { Component, inject } from '@angular/core';
import { BlogsService } from '../../../services/blogs.service';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../../../models/blog.model';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [NgFor, DatePipe],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss'
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
    tags: []
  };
  id: string = '';

  blogsService = inject(BlogsService);
  route = inject(ActivatedRoute);

  ngOnInit() {
    this.id = this.route.snapshot.url[1].path;
    this.blogsService.getBlog(this.id).subscribe((data: any) => {
      this.blog = data;
      // console.log(this.blog);
    });
  }
}
