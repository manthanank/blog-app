import { Component, Input } from '@angular/core';
import { CalendarIconComponent } from '../icons/calendar-icon.component';
import { UpdateIconComponent } from '../icons/update-icon.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-date-display',
  standalone: true,
  imports: [CalendarIconComponent, UpdateIconComponent, DatePipe],
  template: `
    <span class="flex items-center">
      @if (isUpdate) {
        <app-update-icon />
      } @else {
        <app-calendar-icon />
      }
      {{ prefix }} {{ date | date:'mediumDate' }}
    </span>
  `
})
export class DateDisplayComponent {
  @Input() date!: Date;
  @Input() prefix: string = '';
  @Input() isUpdate: boolean = false;
}