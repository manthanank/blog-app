import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BlogsService } from '../../../services/blogs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../../../models/blog.model';
import { AuthService } from '../../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-blog-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './blog-edit.component.html',
  styleUrl: './blog-edit.component.scss',
})
export class BlogEditComponent implements OnInit {
  blogForm: FormGroup;
  blogsService = inject(BlogsService);
  auth = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  id: string = '';
  blog: Blog = {
    _id: '',
    title: '',
    desc: '',
    content: '',
    author: '',
    authorId: '',
    createdAt: '',
    __v: 0,
    featured: false,
    tags: [],
  };

  constructor(private form: FormBuilder) {
    this.blogForm = this.form.group({
      title: [this.blog.title, Validators.required],
      desc: [this.blog.desc, Validators.required],
      tags: [this.blog.tags, Validators.required],
      content: [this.blog.content, Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.url[1].path;
    this.blogsService.getBlog(this.id).subscribe((data: any) => {
      this.blog = data;
      // Check if the current user is the author of the blog
      if (this.blog.author !== this.auth.getUserId()) {
        this.router.navigate(['/']); // Redirect to home page
        // Or show an error message
      }
      this.blogForm = this.form.group({
        title: [this.blog.title, Validators.required],
        desc: [this.blog.desc, Validators.required],
        tags: [this.blog.tags, Validators.required],
        content: [this.blog.content, Validators.required],
      });
      console.log(this.blog);
    });
  }

  onSubmit() {
    const data = {
      title: this.blogForm.value.title,
      desc: this.blogForm.value.desc,
      tags: this.blogForm.value.tags,
      content: this.blogForm.value.content,
      author: this.auth.getUserId(),
    };

    this.blogsService.updateBlog(this.id, data).subscribe((data: any) => {
      console.log(data);
    });
  }
}
