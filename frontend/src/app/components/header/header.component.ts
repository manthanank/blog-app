import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isLoggedIn: boolean = false;
  auth = inject(AuthService);

  constructor() { }

  ngOnInit(): void {
    this.isLoggedIn = this.auth.getIsAuth();
  }

  logout(){
    this.auth.logout();
  }
}
