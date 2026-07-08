import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-all-button',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="text-center mt-8">
      <a 
        routerLink="/blogs" 
        class="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        View All Blogs
      </a>
    </div>
  `
})
export class ViewAllButtonComponent {}