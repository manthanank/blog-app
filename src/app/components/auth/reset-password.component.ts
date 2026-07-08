import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 animate-fadeIn">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Set New Password
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Please enter your new password below for account access recovery
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
          <form class="mt-8 space-y-6" [formGroup]="resetForm" (ngSubmit)="onSubmit()">
            <div class="rounded-md shadow-sm space-y-4">
              <div>
                <label for="password" class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  id="password"
                  type="password"
                  formControlName="password"
                  required
                  class="appearance-none rounded-xl relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="••••••••"
                />
                @if (resetForm.get('password')?.touched && resetForm.get('password')?.invalid) {
                  <p class="mt-1 text-xs text-red-600">Password must be at least 5 characters</p>
                }
              </div>

              <div>
                <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  formControlName="confirmPassword"
                  required
                  class="appearance-none rounded-xl relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="••••••••"
                />
                @if (resetForm.hasError('mismatch') && resetForm.get('confirmPassword')?.touched) {
                  <p class="mt-1 text-xs text-red-600">Passwords do not match</p>
                }
              </div>
            </div>

            <div>
              <button
                type="submit"
                [disabled]="resetForm.invalid || isLoading"
                class="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
              >
                @if (isLoading) {
                  <span class="inline-block animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  Updating Password...
                } @else {
                  Update Password
                }
              </button>
            </div>
          </form>
        }

        <div class="text-center text-sm text-gray-600 mt-4">
          <a routerLink="/login" class="font-medium text-blue-600 hover:text-blue-500 transition-colors">Back to Sign In</a>
        </div>
      </div>
    </div>
  `
})
export class ResetPasswordComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  token: string = '';
  email: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isLoading = false;

  resetForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(5)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  ngOnInit() {
    this.token = this.route.snapshot.params['token'] || '';
    this.email = this.route.snapshot.params['email'] || '';

    if (!this.token || !this.email) {
      this.errorMessage = 'Invalid password reset request details (missing token or email).';
    }
  }

  passwordMatchValidator(g: any) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null : { 'mismatch': true };
  }

  onSubmit() {
    if (this.resetForm.invalid || !this.token || !this.email) return;

    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;

    const password = this.resetForm.value.password!;

    this.authService.resetPassword(this.email, this.token, password).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Your password has been successfully updated! Redirecting to login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.message || 'Failed to reset password. Link might be expired or invalid.';
      }
    });
  }
}
