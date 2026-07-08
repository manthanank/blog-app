import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tag } from '../../models/tag.model';

@Component({
  selector: 'app-tag-cloud',
  standalone: true,
  imports: [],
  template: `
    <div class="flex flex-wrap gap-2">
      @for (tag of tags; track $index) {
        <button
          (click)="onTagSelect(tag)"
          [class]="tag.color + ' ' + (selectedTagId === tag.id ? 'ring-2 ring-offset-2' : '')"
          class="px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 hover:opacity-80"
        >
          {{ tag.name }}
        </button>
      }
    </div>
  `
})
export class TagCloudComponent {
  @Input() tags: Tag[] = [];
  @Input() selectedTagId: string | null = null;
  @Output() tagSelect = new EventEmitter<Tag>();

  onTagSelect(tag: Tag): void {
    this.tagSelect.emit(tag);
  }
}