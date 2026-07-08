import { Component } from '@angular/core';

@Component({
  selector: 'app-terms',
  standalone: true,
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Terms of Service</h1>
      <div class="bg-white rounded-lg shadow-md p-8">
        <h2 class="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p class="mb-4">By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>

        <h2 class="text-xl font-semibold mb-4">2. Use License</h2>
        <p class="mb-4">Permission is granted to temporarily download one copy of the materials (information or software) on My Blog's website for personal, non-commercial transitory viewing only.</p>

        <h2 class="text-xl font-semibold mb-4">3. Disclaimer</h2>
        <p class="mb-4">The materials on My Blog's website are provided on an 'as is' basis. My Blog makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
      </div>
    </div>
  `
})
export class TermsComponent {}