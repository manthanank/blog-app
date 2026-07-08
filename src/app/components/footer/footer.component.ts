import { Component } from '@angular/core';
import { SocialLinksComponent } from '../shared/social-links.component';
import { FooterLinksComponent } from './footer-links.component';
import { FooterAboutComponent } from './footer-about.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SocialLinksComponent, FooterLinksComponent, FooterAboutComponent],
  template: `
    <footer class="bg-gray-800 text-white py-8 mt-auto">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <app-footer-about />
          <app-footer-links />
          <div>
            <h3 class="text-lg font-semibold mb-4">Follow Us</h3>
            <app-social-links />
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {{ currentYear }} Blogs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}