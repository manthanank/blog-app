import { DatePipe, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogsService } from '../../../services/blogs.service';
import { Blog } from '../../../models/blog.model';

@Component({
  selector: 'app-tag-details',
  standalone: true,
  imports: [NgFor, DatePipe, RouterLink],
  templateUrl: './tag-details.component.html',
  styleUrl: './tag-details.component.scss'
})
export class TagDetailsComponent {

  blogs: Blog[] = [];

  blogsService = inject(BlogsService);
  route = inject(ActivatedRoute);
  id: string = '';

  ngOnInit() {
    this.id = this.route.snapshot.params['tag'];
    this.blogsService.getBlogByTag(this.id).subscribe((data: any) => {
      this.blogs = data;
      console.log(this.blogs);
    });
  }
}
