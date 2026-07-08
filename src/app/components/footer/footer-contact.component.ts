import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-contact',
  standalone: true,
  template: `
    <div class="text-gray-300">
      <p class="mb-2">
        <span class="font-medium">Email:</span> manthan.ank46&#64;gmail.com
      </p>
      <p>
        <span class="font-medium">Location:</span> Karnataka, India
      </p>
    </div>
  `
})
export class FooterContactComponent {}