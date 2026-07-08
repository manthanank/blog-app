import { Component, Input } from '@angular/core';
import { AuthorIconComponent } from '../icons/author-icon.component';

@Component({
  selector: 'app-author-display',
  standalone: true,
  imports: [AuthorIconComponent],
  template: `
    <span class="flex items-center">
      <app-author-icon />
      {{ author }}
    </span>
  `
})
export class AuthorDisplayComponent {
  @Input() author!: string;
}