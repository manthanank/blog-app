import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 animate-fadeIn">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Sign in to write posts and manage comments
          </p>
        </div>

        @if (errorMessage) {
          <div class="p-4 bg-red-50 border-l-4 border-red-500 rounded-md text-sm text-red-700">
            {{ errorMessage }}
          </div>
        }

        <form class="mt-8 space-y-6" [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="rounded-md shadow-sm space-y-4">
            <div>
              <label for="emailOrUsername" class="block text-sm font-medium text-gray-700 mb-1">Username or Email</label>
              <input
                id="emailOrUsername"
                type="text"
                formControlName="emailOrUsername"
                required
                class="appearance-none rounded-xl relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter email or username"
              />
              @if (loginForm.get('emailOrUsername')?.touched && loginForm.get('emailOrUsername')?.invalid) {
                <p class="mt-1 text-xs text-red-600">This field is required</p>
              }
            </div>

            <div>
              <div class="flex justify-between items-center mb-1">
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <a routerLink="/forgot-password" class="text-xs font-semibold text-blue-600 hover:text-blue-500 transition-colors">Forgot Password?</a>
              </div>
              <input
                id="password"
                type="password"
                formControlName="password"
                required
                class="appearance-none rounded-xl relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="••••••••"
              />
              @if (loginForm.get('password')?.touched && loginForm.get('password')?.invalid) {
                <p class="mt-1 text-xs text-red-600">Password must be at least 5 characters</p>
              }
            </div>
          </div>

          <div>
            <button
              type="submit"
              [disabled]="loginForm.invalid || isLoading"
              class="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
            >
              @if (isLoading) {
                <span class="inline-block animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Logging in...
              } @else {
                Sign In
              }
            </button>
          </div>
        </form>

        <div class="text-center text-sm text-gray-600 mt-4">
          Don't have an account? 
          <a routerLink="/register" class="font-medium text-blue-600 hover:text-blue-500 transition-colors">Register here</a>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage: string | null = null;
  isLoading = false;

  loginForm = this.fb.group({
    emailOrUsername: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = null;

    const { emailOrUsername, password } = this.loginForm.value;

    this.authService.login(emailOrUsername!, password!).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.message || 'Invalid username/email or password';
      }
    });
  }
}
