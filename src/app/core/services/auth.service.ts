import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Auth } from '../models/auth.model';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment.development';
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
  private userRole: string = '';
  private userName: string = '';
  private name: string = '';
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

  getUserRole() {
    return this.userRole;
  }

  getUserName() {
    return this.userName;
  }

  getName() {
    return this.name;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  login(emailOrUsername: string, password: string) {
    const user = { emailOrUsername: emailOrUsername, password: password };
    this.http.post(`${apiUrl}/login`, user).subscribe(
      (res: any) => {
        const token = res.token;
        this.token = token;
        if (token) {
          const expiresInDuration = res.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = res.userId;
          this.userRole = res.userRole;
          this.userName = res.username;
          this.name = res.name;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          console.log(expirationDate);
          this.saveAuthData(
            token,
            expirationDate,
            this.userId,
            this.userRole,
            this.userName,
            this.name
          );
          localStorage.setItem('isLoggedIn', 'true'); // Save authentication status to localStorage
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        this.errorMsg = error?.error?.message;
        this.authStatusListener.next(false);
      }
    );
  }

  updateProfile(data: any) {
    return this.http.put(`${apiUrl}/profile/${this.userId}`, data).subscribe({
      next: (res: any) => {
        // console.log(res);
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        // Handle the error here, e.g. display an error message to the user
      },
    });
  }

  register(user: Auth) {
    return this.http.post(`${apiUrl}/register`, user).subscribe({
      next: (res: any) => {
        const token = res.token;
        this.token = token;
        if (token) {
          const expiresInDuration = res.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = res.userId;
          this.userRole = res.userRole;
          this.userName = res.username;
          this.name = res.name;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          console.log(expirationDate);
          this.saveAuthData(
            token,
            expirationDate,
            this.userId,
            this.userRole,
            this.userName,
            this.name
          );
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        this.errorMsg = error.error.message;
        this.authStatusListener.next(false);
      },
    });
  }

  forgorPassword(email: string) {
    return this.http.post(`${apiUrl}/forgot-password`, { email: email });
  }

  resetPassword(email: string, token: string, password: string) {
    return this.http.put(`${apiUrl}/reset-password`, {
      email: email,
      token: token,
      password: password,
    });
  }

  checkUsername(username: string) {
    return this.http.get(`${apiUrl}/check-username/${username}`);
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
      this.userRole = authInformation.userRole ? authInformation.userRole : '';
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
    this.userRole = '';
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

  private saveAuthData(
    token: string,
    expirationDate: Date,
    userId: string,
    userRole: string,
    userName: string,
    name: string
  ) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('userName', userName);
    localStorage.setItem('name', name);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('name');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');
    const name = localStorage.getItem('name');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      userRole: userRole,
      userName: userName,
      name: name,
    };
  }
}
