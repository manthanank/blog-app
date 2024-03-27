import { Component, inject } from '@angular/core';
import { Tags } from '../../../core/models/blog.model';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../shared/breadcrumbs/breadcrumbs.component';
import { Store } from '@ngrx/store';
import { TagsService } from '../tags.service';
@Component({
  selector: 'app-tag-list',
  standalone: true,
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.scss',
  imports: [NgFor, RouterLink, BreadcrumbsComponent, NgIf],
})
export class TagListComponent {
  tags: Tags = [];

  tagsService = inject(TagsService);
  store = inject(Store);
  isLoading: boolean = false;

  constructor() {}

  ngOnInit() {
    this.isLoading = true;
    this.tagsService.getTags().subscribe({
      next: (data: any) => {
        this.tags = data;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error occurred while fetching tags:', error);
        this.isLoading = false;
      },
    });
  }
}
