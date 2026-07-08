import { Component } from '@angular/core';
import { SocialIconComponent } from './social-icon.component';
import { SocialLink } from '../../models/social-link.model';
import { SOCIAL_ICONS } from '../../constants/social-icons';

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [SocialIconComponent],
  template: `
    <div class="flex space-x-4">
      @for (link of socialLinks; track $index) {
        <a 
          [href]="link.url" 
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-300 hover:text-white transition-colors duration-200"
          [attr.aria-label]="link.ariaLabel"
        >
          <app-social-icon [path]="link.iconPath" />
        </a>
      }
    </div>
  `
})
export class SocialLinksComponent {
  socialLinks: SocialLink[] = [
    {
      name: 'X',
      url: 'https://x.com/manthan_ank',
      iconPath: SOCIAL_ICONS.X,
      ariaLabel: 'Follow us on X'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/manthanank',
      iconPath: SOCIAL_ICONS.GITHUB,
      ariaLabel: 'Follow us on GitHub'
    }
  ];
}