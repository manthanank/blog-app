import { Component, Input } from '@angular/core';
import { AuthorDisplayComponent } from './metadata/author-display.component';
import { DateDisplayComponent } from './metadata/date-display.component';

@Component({
  selector: 'app-post-metadata',
  standalone: true,
  imports: [AuthorDisplayComponent, DateDisplayComponent],
  template: `
    <div class="flex flex-wrap items-center text-sm text-gray-500 gap-4">
      <app-author-display [author]="author" />
      <app-date-display [date]="postedDate" prefix="Posted" />
      @if (updatedDate) {
      <app-date-display
        [date]="updatedDate"
        prefix="Updated"
        [isUpdate]="true"
      />
      }
      @if (readingTime) {
      <span class="flex items-center gap-1">
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ readingTime }}
      </span>
      }
    </div>
  `,
})
export class PostMetadataComponent {
  @Input() author!: string;
  @Input() postedDate!: Date;
  @Input() updatedDate?: Date;
  @Input() readingTime?: string;
}
