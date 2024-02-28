import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [RegisterService],
})
export class RegisterComponent {
  registerForm: FormGroup;

  authService = inject(RegisterService);
  router = inject(Router);

  constructor() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.authService
      .register(this.registerForm.value.email, this.registerForm.value.password)
      .subscribe((data: any) => {
        if (data.message) {
          this.router.navigate(['/home']);
          // localStorage.setItem('token', data.token);
        }
      });
  }
}
