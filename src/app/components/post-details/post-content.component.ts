import { Component, Input } from '@angular/core';
import { FormattedContentComponent } from '../shared/content/formatted-content.component';

@Component({
  selector: 'app-post-content',
  standalone: true,
  imports: [FormattedContentComponent],
  template: `
    <div class="prose prose-lg max-w-none">
      <app-formatted-content [content]="content" />
    </div>
  `
})
export class PostContentComponent {
  @Input() content!: string;
}