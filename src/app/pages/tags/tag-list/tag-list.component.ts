import { Component, inject } from '@angular/core';
import { BlogsService } from '../../../services/blogs.service';
import { Tags } from '../../../models/blog.model';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from "../../../components/breadcrumbs/breadcrumbs.component";

@Component({
    selector: 'app-tag-list',
    standalone: true,
    templateUrl: './tag-list.component.html',
    styleUrl: './tag-list.component.scss',
    imports: [NgFor, RouterLink, BreadcrumbsComponent]
})
export class TagListComponent {
  
  tags: Tags = [];

  blogsService = inject(BlogsService);

  constructor() {}

  ngOnInit() {
    this.blogsService.getTags().subscribe((data: any) => {
      this.tags = data;
      // console.log(this.tags);
    });
  }
}
