import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BlogsService } from '../blogs.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-blog-add',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './blog-add.component.html',
  styleUrl: './blog-add.component.scss',
})
export class BlogAddComponent {
  blogForm: FormGroup;

  blogService = inject(BlogsService);
  auth = inject(AuthService);
  route = inject(Router);

  constructor() {
    this.blogForm = new FormGroup({
      title: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      tags: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      featured: new FormControl('', Validators.required),
      author: new FormControl(this.auth.getUserName()),
      authorId: new FormControl(this.auth.getUserId()),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    // console.log(this.blogForm.value);
    this.blogService.addBlog(this.blogForm.value).subscribe((res) => {
      //console.log('Blog added successfully!');
      this.route.navigate(['']);
    });
  }
}
