import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { NavLinkComponent } from './nav-link.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [CommonModule, NavLinkComponent],
  template: `
    <ul [class]="isMobile ? 'flex flex-col space-y-2 py-3' : 'flex items-center space-x-6'">
      <li><app-nav-link route="/" label="Home" [exact]="true" (linkClicked)="onLinkClicked()" /></li>
      <li><app-nav-link route="/blogs" label="Blogs" (linkClicked)="onLinkClicked()" /></li>
      <li><app-nav-link route="/tags" label="Tags" (linkClicked)="onLinkClicked()" /></li>
      <li><app-nav-link route="/about" label="About" (linkClicked)="onLinkClicked()" /></li>

      @if (authService.isLoggedIn()) {
        <li><app-nav-link route="/blogs/new" label="Write" (linkClicked)="onLinkClicked()" /></li>
        <li><app-nav-link [route]="'/profile/' + authService.getUserName()" [label]="'Profile (' + authService.getUserName() + ')'" (linkClicked)="onLinkClicked()" /></li>
        <li>
          <button
            (click)="onLogout()"
            class="block py-1 hover:text-gray-300 transition-colors duration-200 text-left w-full md:w-auto"
          >
            Logout
          </button>
        </li>
      } @else {
        <li><app-nav-link route="/login" label="Login" (linkClicked)="onLinkClicked()" /></li>
        <li><app-nav-link route="/register" label="Register" (linkClicked)="onLinkClicked()" /></li>
      }
    </ul>
  `
})
export class NavMenuComponent {
  @Input() isMobile = false;
  @Output() menuClosed = new EventEmitter<void>();

  authService = inject(AuthService);

  onLinkClicked() {
    if (this.isMobile) {
      this.menuClosed.emit();
    }
  }

  onLogout() {
    this.authService.logout();
    if (this.isMobile) {
      this.menuClosed.emit();
    }
  }
}