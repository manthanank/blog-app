import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./pages/forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent),
  },
  {
    path: 'reset-password/:token/:email',
    loadComponent: () =>
      import('./pages/reset-password/reset-password.component').then((m) => m.ResetPasswordComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'blogs',
    loadComponent: () =>
      import('./pages/blogs/blog-list/blog-list.component').then((m) => m.BlogListComponent),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
  },
  {
    path: 'blogs/:id',
    loadComponent: () =>
      import('./pages/blogs/blog-details/blog-details.component').then((m) => m.BlogDetailsComponent),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./pages/blogs/blog-add/blog-add.component').then((m) => m.BlogAddComponent),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./pages/blogs/blog-edit/blog-edit.component').then((m) => m.BlogEditComponent),
  },
  {
    path: 'tags',
    loadComponent: () =>
      import('./pages/tags/tag-list/tag-list.component').then((m) => m.TagListComponent), 
  },
  {
    path: 'tags/:tag',
    loadComponent: () =>
      import('./pages/tags/tag-details/tag-details.component').then((m) => m.TagDetailsComponent),
  },
  { path: '**', redirectTo: '' },
];
