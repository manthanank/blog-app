import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UserSession {
  token: string;
  userId: string;
  userRole: string;
  username: string;
  email: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = environment.apiUrl;

  currentUser = signal<UserSession | null>(null);
  
  private authStatusListener = new BehaviorSubject<boolean>(false);
  authStatus$ = this.authStatusListener.asObservable();

  private tokenTimer: any;

  constructor() {
    this.autoAuthUser();
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  getToken(): string | null {
    return this.currentUser()?.token || null;
  }

  getUserId(): string | null {
    return this.currentUser()?.userId || null;
  }

  getUserRole(): string | null {
    return this.currentUser()?.userRole || null;
  }

  getUserName(): string | null {
    return this.currentUser()?.username || null;
  }

  getName(): string | null {
    return this.currentUser()?.name || null;
  }

  getAuthStatusListener() {
    return this.authStatus$;
  }

  login(emailOrUsername: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { emailOrUsername, password }).pipe(
      tap(res => {
        if (res.token) {
          const expirationDate = new Date(Date.now() + res.expiresIn * 1000);
          const session: UserSession = {
            token: res.token,
            userId: res.userId,
            userRole: res.userRole || 'user',
            username: res.username,
            email: res.email,
            name: res.name
          };
          
          this.setCurrentSession(session, expirationDate);
        }
      })
    );
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user).pipe(
      tap(res => {
        if (res.token) {
          const expirationDate = new Date(Date.now() + res.expiresIn * 1000);
          const session: UserSession = {
            token: res.token,
            userId: res.userId,
            userRole: res.userRole || 'user',
            username: res.username,
            email: res.email,
            name: res.name
          };
          this.setCurrentSession(session, expirationDate);
        }
      })
    );
  }

  logout() {
    this.currentUser.set(null);
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
      next: () => {},
      error: () => {}
    });
    this.router.navigate(['/']);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(email: string, token: string, password: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/reset-password`, { email, token, password });
  }

  checkUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/check-username/${username}`);
  }

  getUserProfile(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile/${username}`);
  }

  updateUserProfile(username: string, profile: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/profile/${username}`, profile);
  }

  private setCurrentSession(session: UserSession, expirationDate: Date) {
    this.currentUser.set(session);
    this.authStatusListener.next(true);
    
    const expiresIn = expirationDate.getTime() - Date.now();
    this.setAuthTimer(expiresIn / 1000);
    
    this.saveAuthData(session, expirationDate);
  }

  private setAuthTimer(duration: number) {
    clearTimeout(this.tokenTimer);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(session: UserSession, expirationDate: Date) {
    localStorage.setItem('token', session.token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', session.userId);
    localStorage.setItem('userRole', session.userRole);
    localStorage.setItem('userName', session.username);
    localStorage.setItem('name', session.name);
    localStorage.setItem('email', session.email);
    localStorage.setItem('isLoggedIn', 'true');
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('isLoggedIn');
  }

  private autoAuthUser() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    if (!token || !expiration) return;

    const expirationDate = new Date(expiration);
    const now = new Date();
    const expiresIn = expirationDate.getTime() - now.getTime();

    if (expiresIn > 0) {
      const session: UserSession = {
        token,
        userId: localStorage.getItem('userId') || '',
        userRole: localStorage.getItem('userRole') || 'user',
        username: localStorage.getItem('userName') || '',
        email: localStorage.getItem('email') || '',
        name: localStorage.getItem('name') || ''
      };
      
      this.currentUser.set(session);
      this.authStatusListener.next(true);
      this.setAuthTimer(expiresIn / 1000);
    } else {
      this.logout();
    }
  }
}
