import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
  editProfileForm: FormGroup;

  authService = inject(AuthService);
  router = inject(Router);

  constructor() {
    this.editProfileForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.authService.getUserDetails().subscribe((profile: any) => {
      this.editProfileForm = new FormGroup({
        firstName: new FormControl(profile.firstName, Validators.required),
        lastName: new FormControl(profile.lastName, Validators.required),
        email: new FormControl(profile.email, [Validators.required, Validators.email]),
        username: new FormControl(profile.username, Validators.required),
      });
    });
  }

  onSubmit() {
    // console.log(this.editProfileForm.value);
    if (this.editProfileForm.invalid) {
      return;
    }

    this.authService.updateProfile(this.editProfileForm.value);
  }
}
