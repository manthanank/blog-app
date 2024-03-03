import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-blog-add',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './blog-add.component.html',
  styleUrl: './blog-add.component.scss',
})
export class BlogAddComponent {
  blogForm: FormGroup;

  constructor() {
    this.blogForm = new FormGroup({
      title: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      tags: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log('Form Submitted!');
  }
}
