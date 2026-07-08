import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-clear-tag-button',
  standalone: true,
  template: `
    <button
      (click)="clearTag.emit()"
      class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 
             bg-white border border-gray-300 rounded-lg hover:bg-gray-50 
             transition-colors duration-200"
      aria-label="Clear tag selection"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
      Clear Selection
    </button>
  `
})
export class ClearTagButtonComponent {
  @Output() clearTag = new EventEmitter<void>();
}