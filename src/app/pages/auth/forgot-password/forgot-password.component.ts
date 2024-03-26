import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  authService = inject(AuthService);
  message: string = '';
  errorMessage: string = '';

  constructor() {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    // Send email to user with reset password link
    this.authService
      .forgorPassword(this.forgotPasswordForm.value.email)
      .subscribe({
        next: (data: any) => {
          if (data.message) {
            this.message = data.message;
            setTimeout(() => {
              this.message = '';
            }, 2000);
          }
        },
        error: (error) => {
          this.errorMessage = error.error.message;
          setTimeout(() => {
            this.errorMessage = '';
          }, 2000);
        },
      });
  }
}
