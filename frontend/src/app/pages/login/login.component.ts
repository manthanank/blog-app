import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, RouterLink, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthService],
})
export class LoginComponent {
  loginForm: FormGroup;

  authService = inject(AuthService);
  router = inject(Router);

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password);
  }
}
