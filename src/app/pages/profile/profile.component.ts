import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BlogsService } from '../../services/blogs.service';
import { Subscription } from 'rxjs';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface Profile {
  _id: string
  email: string
  firstName: string
  lastName: string
  __v: number
}

export type Blogs = Blog[]

export interface Blog {
  _id: string
  slug: string
  title: string
  desc: string
  content: string
  author: string
  authorId: string
  tags: string[]
  createdAt: string
  featured: boolean
  __v: number
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgFor, RouterLink, DatePipe, NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  private authStatusSubscription: Subscription = new Subscription();
  isLoggedIn: boolean = false;
  auth = inject(AuthService);
  currentUserId: string = '';
  blogsService = inject(BlogsService);
  profile: Profile = {
    _id: '',
    email: '',
    firstName: '',
    lastName: '',
    __v: 0
  };
  blogs: Blogs = [];

  constructor() {}

  ngOnInit() {
    this.currentUserId = this.auth.getUserId();
    this.authStatusSubscription = this.auth
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
      });
    this.auth.getUserDetails().subscribe((data: any) => {
      // console.log(data);
      this.profile = data;
    });
    this.blogsService.getBlogByAuthor(this.currentUserId).subscribe((data: any) => {
      // console.log(data);
      this.blogs = data;
    });
  }

  deleteBlog(id: string) {
    this.blogsService.deleteBlog(id).subscribe((data: any) => {
      this.blogsService.getBlogs().subscribe((data: any) => {
        this.blogs = data.posts;
      });
    });
  }
  
  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }
}
