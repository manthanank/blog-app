import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private authStatusSubscription: Subscription = new Subscription();

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  userName: string = '';
  auth = inject(AuthService);

  constructor() {}

  ngOnInit(): void {
    this.authStatusSubscription = this.auth
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
        // console.log('Is Authenticated:', this.isLoggedIn);
        this.isAdmin = this.auth.getUserRole() === 'admin';
        this.userName = this.auth.getUserName();
        // console.log('User Name:', this.userName);
      });
    // Check authentication status on component initialization
    this.isLoggedIn = this.auth.getIsAuth();
    // console.log('Is Authenticated:', this.isLoggedIn);
    this.isAdmin = this.auth.getUserRole() === 'admin';
    // get user name
    this.userName = this.auth.getUserName();
    // console.log('User Name:', this.userName);
  }

  logout() {
    this.auth.logout();
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }
}
