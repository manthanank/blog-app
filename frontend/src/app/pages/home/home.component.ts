import { Component, OnInit, inject } from '@angular/core';
import { BlogsService } from '../../services/blogs.service';
import { HttpClientModule } from '@angular/common/http';
import { Blogs, FeaturedBlogs, RecentBlogs } from '../../models/blog.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [BlogsService]
})
export class HomeComponent implements OnInit{

  blogs: Blogs[] = [];
  featuredBlogs: FeaturedBlogs[] = [];
  recentBlogs: RecentBlogs[] = [];

  blogsService = inject(BlogsService);

  constructor() {}

  ngOnInit() {
    this.blogsService.getBlogs().subscribe((data: any) => {
      this.blogs = data;
      console.log(this.blogs);
    });
    this.blogsService.getFeaturedBlogs().subscribe((data: any) => {
      this.featuredBlogs = data;
      console.log(this.featuredBlogs);
    });
    this.blogsService.getRecentBlogs().subscribe((data: any) => {
      this.recentBlogs = data;
      console.log(this.recentBlogs);
    });
  }
  
}
