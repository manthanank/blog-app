import { Component, inject } from '@angular/core';
import { Tags } from '../../../core/models/blog.model';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { TagsService } from '../tags.service';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
@Component({
  selector: 'app-tag-list',
  standalone: true,
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.scss',
  imports: [NgFor, RouterLink, NgIf, BreadcrumbModule],
})
export class TagListComponent {
  tags: Tags = [];
  tagsService = inject(TagsService);
  store = inject(Store);
  isLoading: boolean = false;
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  constructor() {}

  ngOnInit() {
    this.items = [{ label: 'Tags' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
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
