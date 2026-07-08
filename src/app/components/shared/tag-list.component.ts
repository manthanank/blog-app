import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex flex-wrap gap-2">
      @for (tag of tags; track $index) {
        <a 
          [routerLink]="['/tags']" 
          [queryParams]="{ tag: tag }"
          class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                 bg-blue-50 text-blue-700 hover:bg-blue-100 
                 transition-colors duration-200 ease-in-out
                 border border-blue-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
          </svg>
          {{ tag }}
        </a>
      }
    </div>
  `
})
export class TagListComponent {
  @Input() tags: string[] = [];
}