import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Output() pageChange = new EventEmitter<number>();

  currentPage = 1;

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  changePage(newPage: number): void {
    if (newPage < 1 || newPage > this.totalPages) {
      return;
    }

    this.currentPage = newPage;
    this.pageChange.emit(this.currentPage);
  }
}
