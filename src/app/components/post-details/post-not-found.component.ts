import { Component } from '@angular/core';
import { BackButtonComponent } from '../shared/back-button.component';

@Component({
  selector: 'app-post-not-found',
  standalone: true,
  imports: [BackButtonComponent],
  template: `
    <div class="text-center py-12">
      <p class="text-gray-600 mb-4">Post not found</p>
      <app-back-button />
    </div>
  `
})
export class PostNotFoundComponent {}