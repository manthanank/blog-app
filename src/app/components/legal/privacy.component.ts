import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy',
  standalone: true,
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div class="bg-white rounded-lg shadow-md p-8">
        <h2 class="text-xl font-semibold mb-4">1. Information We Collect</h2>
        <p class="mb-4">We collect information that you provide directly to us when using our website, including when you sign up for our newsletter or leave comments.</p>

        <h2 class="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
        <p class="mb-4">We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to protect our services and users.</p>

        <h2 class="text-xl font-semibold mb-4">3. Information Sharing</h2>
        <p class="mb-4">We do not share your personal information with third parties except as described in this privacy policy or with your consent.</p>
      </div>
    </div>
  `
})
export class PrivacyComponent {}