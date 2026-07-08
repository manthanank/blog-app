import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  standalone: true,
  template: `
    <button
      (click)="onDeleteClick()"
      class="text-red-600 hover:text-red-800 font-medium"
      [attr.aria-label]="'Delete ' + itemName"
    >
      Delete
    </button>
  `
})
export class DeleteButtonComponent {
  @Input() itemName = 'item';
  @Output() delete = new EventEmitter<void>();

  onDeleteClick() {
    if (confirm(`Are you sure you want to delete this ${this.itemName}?`)) {
      this.delete.emit();
    }
  }
}