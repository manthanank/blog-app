import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;

  usernameTaken: any;

  authService = inject(AuthService);
  router = inject(Router);

  constructor() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    });
  }

  checkUsername() {
    const username = this.registerForm.get('username')?.value;
    if (!username) {
      this.usernameTaken = "Username is required";
      return;
    }
    this.authService.checkUsername(username).subscribe({
      next: (response: any) => {
        if (response.available) {
          this.usernameTaken = "Username is available";
        } else {
          this.usernameTaken = "Username is already taken";
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.authService.register(this.registerForm.value);
  }
}
