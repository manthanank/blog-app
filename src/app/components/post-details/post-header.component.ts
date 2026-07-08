import { Component, Input } from '@angular/core';
import { TagListComponent } from '../shared/tag-list.component';
import { PostMetadataComponent } from '../shared/post-metadata.component';

@Component({
  selector: 'app-post-header',
  standalone: true,
  imports: [TagListComponent, PostMetadataComponent],
  template: `
    <header class="mb-8">
      <h1 class="text-4xl font-bold mb-6">{{ title }}</h1>
      <app-tag-list [tags]="tags" class="mb-6" />
      <app-post-metadata 
        [author]="author" 
        [postedDate]="postedDate"
        [updatedDate]="updatedDate" 
      />
    </header>
  `
})
export class PostHeaderComponent {
  @Input() title!: string;
  @Input() tags!: string[];
  @Input() author!: string;
  @Input() postedDate!: Date;
  @Input() updatedDate?: Date;
}