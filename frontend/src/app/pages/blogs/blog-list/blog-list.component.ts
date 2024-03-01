import { Component, OnInit, inject } from '@angular/core';
import { BlogsService } from '../../../services/blogs.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss',
  providers: [BlogsService],
})
export class BlogListComponent implements OnInit{

  blogs: any = [];

  blogsService = inject(BlogsService);

  ngOnInit() {
    this.blogsService.getBlogs().subscribe((data: any) => {
      this.blogs = data;
      console.log(this.blogs);
    });
  }
}
