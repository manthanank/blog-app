import { Component } from '@angular/core';
import { ContactFormComponent } from './contact-form.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactFormComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Contact Us</h1>
      <div class="max-w-2xl mx-auto">
        <div class="bg-white rounded-lg shadow-md p-8">
          <p class="text-gray-600 mb-6">
            Have a question or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
          </p>
          <app-contact-form />
        </div>
      </div>
    </div>
  `
})
export class ContactComponent {}