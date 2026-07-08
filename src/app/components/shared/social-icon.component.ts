import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-social-icon',
  standalone: true,
  template: `
    <svg 
      class="h-6 w-6" 
      fill="currentColor" 
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path [attr.d]="path"></path>
    </svg>
  `
})
export class SocialIconComponent {
  @Input() path!: string;
}