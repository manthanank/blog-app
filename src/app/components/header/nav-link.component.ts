import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-link',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <a
      [routerLink]="route"
      routerLinkActive="text-blue-300"
      [routerLinkActiveOptions]="{ exact: exact }"
      class="block py-1 hover:text-gray-300 transition-colors duration-200"
      (click)="linkClicked.emit()"
    >
      {{ label }}
    </a>
  `
})
export class NavLinkComponent {
  @Input() route!: string;
  @Input() label!: string;
  @Input() exact = false;
  @Output() linkClicked = new EventEmitter<void>();
}