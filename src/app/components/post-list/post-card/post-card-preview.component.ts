import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-card-preview',
  standalone: true,
  template: `
    <p class="text-gray-600 mb-4 line-clamp-3 flex-grow">{{ content }}</p>
  `
})
export class PostCardPreviewComponent {
  @Input() content!: string;
}