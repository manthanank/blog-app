import { Component, inject } from '@angular/core';
import { BlogsService } from '../../services/blogs.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [BlogsService]
})
export class HomeComponent {

  blogs = inject(BlogsService);

  constructor() {
    this.blogs.getBlogs().subscribe((res: any) => {
      this.blogs = res;
    });
  }
  
}
