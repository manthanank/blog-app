import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BlogsService } from '../../../core/services/blogs.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { EditorModule } from 'primeng/editor';
import { ChipsModule } from 'primeng/chips';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CheckboxModule } from 'primeng/checkbox';
@Component({
  selector: 'app-blog-add',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    ChipsModule,
    FloatLabelModule,
    CheckboxModule,
  ],
  templateUrl: './blog-add.component.html',
  styleUrl: './blog-add.component.scss',
})
export class BlogAddComponent {
  blogForm: FormGroup;
  max = 3;
  blogService = inject(BlogsService);
  auth = inject(AuthService);
  route = inject(Router);
  checked: boolean = false;

  constructor() {
    this.blogForm = new FormGroup({
      title: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      tags: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      featured: new FormControl(this.checked),
      author: new FormControl(this.auth.getUserName()),
      authorId: new FormControl(this.auth.getUserId()),
    });
  }

  onSubmit() {
    // console.log(this.blogForm.value);
    this.blogService.addBlog(this.blogForm.value).subscribe({
      next: (res) => {
        // console.log('Blog added successfully!');
        this.route.navigate(['']);
      },
      error: (error) => {
        console.error('Error adding blog:', error);
        // Handle the error here, e.g. show an error message to the user
      },
    });
  }
}
