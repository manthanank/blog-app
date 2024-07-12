import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BlogsService } from '../../../core/services/blogs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../../../core/models/blog.model';
import { AuthService } from '../../../core/services/auth.service';
import { EditorModule } from 'primeng/editor';
import { ChipsModule } from 'primeng/chips';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CheckboxModule } from 'primeng/checkbox';
@Component({
  selector: 'app-blog-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    ChipsModule,
    FloatLabelModule,
    CheckboxModule,
  ],
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
  max = 3;
  checked: boolean = false;

  constructor(private form: FormBuilder) {
    this.blogForm = this.form.group({
      title: [this.blog.title, Validators.required],
      desc: [this.blog.desc, Validators.required],
      tags: [this.blog.tags, Validators.required],
      content: [this.blog.content, Validators.required],
      featured: [this.blog.featured],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.url[1].path;
    this.blogsService.getBlog(this.id).subscribe({
      next: (data: any) => {
        this.blog = data;
        // Check if the current user is the author of the blog
        if (this.blog.authorId !== this.auth.getUserId()) {
          this.router.navigate(['/']); // Redirect to home page
          // Or show an error message
        } else {
          this.blogForm.patchValue({
            title: this.blog.title,
            desc: this.blog.desc,
            tags: this.blog.tags,
            content: this.blog.content,
            featured: this.blog.featured,
          });
          // console.log(this.blog);
        }
      },
      error: (error: any) => {
        console.error(error);
        // Handle the error here, e.g. show an error message to the user
      },
    });
  }

  onSubmit() {
    const data = {
      title: this.blogForm.value.title,
      desc: this.blogForm.value.desc,
      tags: this.blogForm.value.tags,
      content: this.blogForm.value.content,
      author: this.blog.author,
      featured: this.blogForm.value.featured,
    };
    // console.log(data);

    this.blogsService.updateBlog(this.id, data).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.error(error);
        // Handle the error here, e.g. show an error message to the user
      },
    });
  }
}
