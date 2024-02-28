import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [LoginService],
})
export class LoginComponent {
  loginForm: FormGroup;

  authService = inject(LoginService);
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
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((data: any) => {
        if (data.message) {
          this.router.navigate(['/home']);
          // localStorage.setItem('token', data.token);
        }
      });
  }
}
