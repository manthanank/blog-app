import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-3xl font-bold mb-4">About Our Blog</h2>
      <p class="text-gray-700 leading-relaxed">
        Welcome to our blog! We share insights and knowledge about web development,
        focusing on Angular, Tailwind CSS, and modern web technologies.
      </p>
    </div>
  `
})
export class AboutComponent {}