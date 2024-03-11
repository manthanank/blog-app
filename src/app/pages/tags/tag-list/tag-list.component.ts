import { Component, inject } from '@angular/core';
import { BlogsService } from '../../../services/blogs.service';
import { Tags } from '../../../models/blog.model';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.scss'
})
export class TagListComponent {
  
  tags: Tags = [];

  blogsService = inject(BlogsService);

  constructor() {}

  ngOnInit() {
    this.blogsService.getTags().subscribe((data: any) => {
      this.tags = data;
      console.log(this.tags);
    });
  }
}
