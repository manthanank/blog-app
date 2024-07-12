import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
  editProfileForm: FormGroup;
  usernameTaken: any;

  authService = inject(AuthService);
  user = inject(UsersService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor() {
    this.editProfileForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.user.getUserDetails(params.id).subscribe({
        next: (profile: any) => {
          this.editProfileForm = new FormGroup({
            firstName: new FormControl(profile.firstName, Validators.required),
            lastName: new FormControl(profile.lastName, Validators.required),
            email: new FormControl(profile.email, [
              Validators.required,
              Validators.email,
            ]),
            username: new FormControl(profile.username, Validators.required),
          });
        },
        error: (error) => {
          console.error(error);
          // Handle the error here
        },
      });
    });
  }

  checkUsername() {
    const username = this.editProfileForm.get('username')?.value;

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
    // console.log(this.editProfileForm.value);
    if (this.editProfileForm.invalid) {
      return;
    }

    this.authService.updateProfile(this.editProfileForm.value);
  }
}
