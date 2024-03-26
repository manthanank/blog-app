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
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private authStatusSubscription: Subscription = new Subscription();
  
  isLoggedIn: boolean = false;
  auth = inject(AuthService);

  constructor() { }

  ngOnInit(): void {
    this.authStatusSubscription = this.auth.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
    });
    // Check authentication status on component initialization
    this.isLoggedIn = this.auth.getIsAuth();
  }

  logout(){
    this.auth.logout();
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }
}
