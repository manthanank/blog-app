import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  authService = inject(AuthService);
  message: string = '';
  errorMessage: string = '';
  route = inject(Router);
  router = inject(ActivatedRoute);
  token: string = '';
  email: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.router.params.subscribe((params: any) => {
      // console.log(params);
      this.token = params.token;
      this.email = params.email;
    });
    this.resetPasswordForm = this.formBuilder.group({
      email: [this.email, [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
    
    this.resetPasswordForm.setValidators(this.checkPasswords as ValidatorFn);
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  ngOnInit(): void {
    // Check if user is already authenticated on initialization
    if (this.authService.getIsAuth()) {
      this.route.navigate(['/']);
    }
  }

  onSubmit() {
    // Send email to user with reset password link
    if (this.resetPasswordForm.invalid) {
      return;
    }
    this.authService
      .resetPassword(this.email, this.token, this.resetPasswordForm.value.password)
      .subscribe({
        next: (data: any) => {
          if (data.message) {
            this.message = data.message;
            setTimeout(() => {
              this.message = '';
              this.route.navigate(['/login']);
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
