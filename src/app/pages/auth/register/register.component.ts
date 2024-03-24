import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
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
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
    });
  }

  checkUsername() {
    const username = this.registerForm.get('username')?.value;

    this.authService.checkUsername(username).subscribe({
      next: (response: any) => {
        // Handle the response here
        console.log(response);
        this.usernameTaken = response.message;
      },
      error: (error) => {
        // Handle the error here
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
