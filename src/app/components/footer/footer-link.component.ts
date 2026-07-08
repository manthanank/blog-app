import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer-link',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a 
      [routerLink]="route"
      class="text-gray-300 hover:text-white transition-colors duration-200"
    >
      {{ label }}
    </a>
  `
})
export class FooterLinkComponent {
  @Input() route!: string;
  @Input() label!: string;
}