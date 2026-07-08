import { Component } from '@angular/core';
import { FooterLinkComponent } from './footer-link.component';

@Component({
  selector: 'app-footer-links',
  standalone: true,
  imports: [FooterLinkComponent],
  template: `
    <div>
      <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
      <ul class="space-y-2">
        <li>
          <app-footer-link route="/terms" label="Terms of Service" />
        </li>
        <li>
          <app-footer-link route="/privacy" label="Privacy Policy" />
        </li>
        <li>
          <app-footer-link route="/contact" label="Contact Us" />
        </li>
      </ul>
    </div>
  `
})
export class FooterLinksComponent {}