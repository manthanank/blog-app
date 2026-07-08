import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-[85vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 animate-fadeIn">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create an Account
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Join us to start writing and sharing your articles
          </p>
        </div>

        @if (errorMessage) {
          <div class="p-4 bg-red-50 border-l-4 border-red-500 rounded-md text-sm text-red-700">
            {{ errorMessage }}
          </div>
        }

        <form class="mt-8 space-y-4" [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  formControlName="firstName"
                  required
                  class="appearance-none rounded-xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="John"
                />
                @if (registerForm.get('firstName')?.touched && registerForm.get('firstName')?.invalid) {
                  <p class="mt-1 text-xs text-red-600">Min 3 chars</p>
                }
              </div>

              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  formControlName="lastName"
                  required
                  class="appearance-none rounded-xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Doe"
                />
                @if (registerForm.get('lastName')?.touched && registerForm.get('lastName')?.invalid) {
                  <p class="mt-1 text-xs text-red-600">Min 3 chars</p>
                }
              </div>
            </div>

            <div>
              <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                id="username"
                type="text"
                formControlName="username"
                required
                class="appearance-none rounded-xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="johndoe"
              />
              @if (registerForm.get('username')?.touched && registerForm.get('username')?.invalid) {
                <p class="mt-1 text-xs text-red-600">Min 3 characters</p>
              }
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                id="email"
                type="email"
                formControlName="email"
                required
                class="appearance-none rounded-xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="john.doe@example.com"
              />
              @if (registerForm.get('email')?.touched && registerForm.get('email')?.invalid) {
                <p class="mt-1 text-xs text-red-600">Enter a valid email</p>
              }
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                id="password"
                type="password"
                formControlName="password"
                required
                class="appearance-none rounded-xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="••••••••"
              />
              @if (registerForm.get('password')?.touched && registerForm.get('password')?.invalid) {
                <p class="mt-1 text-xs text-red-600">Min 5 characters</p>
              }
            </div>
          </div>

          <div class="pt-2">
            <button
              type="submit"
              [disabled]="registerForm.invalid || isLoading"
              class="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
            >
              @if (isLoading) {
                <span class="inline-block animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Registering...
              } @else {
                Register
              }
            </button>
          </div>
        </form>

        <div class="text-center text-sm text-gray-600 mt-4">
          Already have an account? 
          <a routerLink="/login" class="font-medium text-blue-600 hover:text-blue-500 transition-colors">Sign in here</a>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage: string | null = null;
  isLoading = false;

  registerForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = null;

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.message || 'Registration failed. Username or email might be taken.';
      }
    });
  }
}
