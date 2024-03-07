import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Auth } from '../models/auth.model';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private token: string = '';
  private tokenTimer: any;
  private userId: string = '';
  private userName: string = '';
  private authStatusListener = new Subject<boolean>();
  errorMsg: any;

  http = inject(HttpClient);
  router = inject(Router);

  constructor() {
    this.autoAuthUser(); // Check if user is already authenticated on initialization
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getUserName() {
    return this.userName;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  login(email: string, password: string) {
    const user = { email: email, password: password };
    this.http.post(`${apiUrl}/login`, user).subscribe(
      (res: any) => {
        const token = res.token;
        this.token = token;
        if (token) {
          const expiresInDuration = res.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = res.userId;
          this.userName = res.name;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate, this.userId, this.userName);
          localStorage.setItem('isLoggedIn', 'true'); // Save authentication status to localStorage
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        this.errorMsg = error.error.message;
        this.authStatusListener.next(false);
      }
    );
  }

  register(user: Auth) {
    this.http.post(`${apiUrl}/register`, user).subscribe(
      (res: any) => {
        this.router.navigate(['/home']);
        this.authStatusListener.next(true);
      },
      (error) => {
        this.errorMsg = error.error.message;
        this.authStatusListener.next(false);
      }
    );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId ? authInformation.userId : '';
      this.userName = authInformation.userName ? authInformation.userName : '';
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    } else {
      this.logout(); // Token expired, logout the user
    }
  }
  

  logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = '';
    this.userName = '';
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    localStorage.removeItem('isLoggedIn'); // Remove authentication status from localStorage
    this.router.navigate(['/login']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, userName: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('userName', this.userName);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      userName: userName
    };
  }
}
