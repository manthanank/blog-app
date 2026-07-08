import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  template: `
    <div class="flex justify-between items-center mt-8">
      <div class="text-gray-600">
        Total: {{ totalItems }} items
      </div>
      <div class="flex space-x-2">
        <button
          (click)="onPageChange(currentPage - 1)"
          [disabled]="currentPage === 1"
          class="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 hover:text-black transition-colors duration-200"
          [class.opacity-50]="currentPage === 1"
          aria-label="Previous page"
        >
          Previous
        </button>
        
        @for (page of getPageNumbers(); track $index) {
          <button
            (click)="onPageChange(page)"
            [class.bg-blue-500]="currentPage === page"
            [class.text-white]="currentPage === page"
            class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-200 hover:text-black transition-colors duration-200"
            [attr.aria-current]="currentPage === page ? 'page' : null"
            [attr.aria-label]="'Page ' + page"
          >
            {{ page }}
          </button>
        }
      
        <button
          (click)="onPageChange(currentPage + 1)"
          [disabled]="currentPage === totalPages"
          class="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 hover:text-black transition-colors duration-200"
          [class.opacity-50]="currentPage === totalPages"
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </div>
  `,
})
export class PaginationComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Input() totalItems = 0;
  @Output() pageChange = new EventEmitter<number>();

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (this.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, this.currentPage - 2);
      let end = Math.min(this.totalPages, start + maxVisiblePages - 1);

      if (end - start < maxVisiblePages - 1) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  }

  trackByPage(index: number, page: number): number {
    return page;
  }
}