import { Component } from '@angular/core';
import { FooterDescriptionComponent } from './footer-description.component';
import { FooterContactComponent } from './footer-contact.component';

@Component({
  selector: 'app-footer-about',
  standalone: true,
  imports: [FooterDescriptionComponent, FooterContactComponent],
  template: `
    <div>
      <h3 class="text-lg font-semibold mb-4">About Our Blog</h3>
      <app-footer-description class="mb-4" />
      <app-footer-contact />
    </div>
  `
})
export class FooterAboutComponent {}