import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-card-title',
  standalone: true,
  template: `
    <h3 class="text-xl font-semibold mb-2 text-gray-900 hover:text-blue-600 transition-colors duration-200">
      {{ title }}
    </h3>
  `
})
export class PostCardTitleComponent {
  @Input() title!: string;
}