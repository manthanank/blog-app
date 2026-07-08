import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 animate-fadeIn">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Reset Password
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Enter your email and we'll send you a password reset link
          </p>
        </div>

        @if (successMessage) {
          <div class="p-4 bg-green-50 border-l-4 border-green-500 rounded-md text-sm text-green-700">
            {{ successMessage }}
          </div>
        }

        @if (errorMessage) {
          <div class="p-4 bg-red-50 border-l-4 border-red-500 rounded-md text-sm text-red-700">
            {{ errorMessage }}
          </div>
        }

        @if (!successMessage) {
          <form class="mt-8 space-y-6" [formGroup]="forgotForm" (ngSubmit)="onSubmit()">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                id="email"
                type="email"
                formControlName="email"
                required
                class="appearance-none rounded-xl relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Enter your registered email"
              />
              @if (forgotForm.get('email')?.touched && forgotForm.get('email')?.invalid) {
                <p class="mt-1 text-xs text-red-600">Please enter a valid email address</p>
              }
            </div>

            <div>
              <button
                type="submit"
                [disabled]="forgotForm.invalid || isLoading"
                class="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
              >
                @if (isLoading) {
                  <span class="inline-block animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  Sending Link...
                } @else {
                  Send Reset Link
                }
              </button>
            </div>
          </form>
        }

        <div class="text-center text-sm text-gray-600 mt-4">
          Remember your password? 
          <a routerLink="/login" class="font-medium text-blue-600 hover:text-blue-500 transition-colors">Sign in here</a>
        </div>
      </div>
    </div>
  `
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  successMessage: string | null = null;
  errorMessage: string | null = null;
  isLoading = false;

  forgotForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  onSubmit() {
    if (this.forgotForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;

    this.authService.forgotPassword(this.forgotForm.value.email!).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'If that email is registered, we have sent instructions to reset your password.';
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.message || 'Something went wrong. Please try again.';
      }
    });
  }
}
