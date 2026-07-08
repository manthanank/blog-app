import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brand-logo',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a 
      routerLink="/" 
      class="text-2xl font-bold hover:text-blue-300 transition-colors duration-200"
    >
      Blogs
    </a>
  `
})
export class BrandLogoComponent {}