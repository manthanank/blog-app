import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private authStatusSubscription: Subscription = new Subscription();
  menuVisible: boolean = false;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  userName: string = '';
  auth = inject(AuthService);

  links: Array<any> = [];

  constructor() {}

  ngOnInit(): void {
    this.authStatusSubscription = this.auth
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
        this.isAdmin = this.auth.getUserRole() === 'admin';
        this.userName = this.auth.getUserName();
        this.updateLinks();
      });

    // Check authentication status on component initialization
    this.isLoggedIn = this.auth.getIsAuth();
    this.isAdmin = this.auth.getUserRole() === 'admin';
    this.userName = this.auth.getUserName();
    this.updateLinks();
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  hideMenu() {
    this.menuVisible = !this.menuVisible;
  }

  logout() {
    this.auth.logout();
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }

  private updateLinks() {
    this.links = [
      { path: '/blogs', label: 'Posts', condition: true },
      { path: '/tags', label: 'Tags', condition: true },
      {
        path: '/users',
        label: 'Users',
        condition: this.isLoggedIn && this.isAdmin,
      },
      {
        path: `/profile/${this.userName}`,
        label: 'Profile',
        condition: this.isLoggedIn,
      },
      { path: '/login', label: 'Login', condition: !this.isLoggedIn },
      {
        path: '',
        label: 'Logout',
        condition: this.isLoggedIn,
        action: () => this.logout(),
      },
    ];
  }
}
