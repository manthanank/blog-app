import { Component, inject } from '@angular/core';
import { BlogsService } from '../../../core/services/blogs.service';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../../../core/models/blog.model';
import { DatePipe, NgFor } from '@angular/common';
import { Location } from '@angular/common';
@Component({
    selector: 'app-blog-details',
    standalone: true,
    templateUrl: './blog-details.component.html',
    styleUrl: './blog-details.component.scss',
    imports: [NgFor, DatePipe]
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
  location = inject(Location);

  ngOnInit() {
    this.id = this.route.snapshot.url[1].path;
    this.blogsService.getBlog(this.id).subscribe((data: any) => {
      this.blog = data;
      // console.log(this.blog);
    });
  }

  goBack() {
    this.location.back();
  }
}
