import { Component, Input } from '@angular/core';
import { Tag } from '../../models/tag.model';

@Component({
  selector: 'app-tag-stats',
  standalone: true,
  imports: [],
  template: `
    @if (tag) {
      <div class="bg-white rounded-lg shadow-md p-6 mb-6 mt-4">
        <h2 class="text-2xl font-bold mb-4">{{ tag.name }}</h2>
        <p class="text-gray-600">
          {{ postCount }} {{ postCount === 1 ? 'post' : 'posts' }} tagged with "{{ tag.name }}"
        </p>
      </div>
    }
  `,
})
export class TagStatsComponent {
  @Input() tag: Tag | null = null;
  @Input() postCount = 0;
}
