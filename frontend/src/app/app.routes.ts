import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'blogs',
    loadComponent: () =>
      import('./pages/blogs/blog-list/blog-list.component').then((m) => m.BlogListComponent),
  },
  // blogs/:id
  {
    path: 'blogs/:id',
    loadComponent: () =>
      import('./pages/blogs/blog-details/blog-details.component').then((m) => m.BlogDetailsComponent),
  },
  { path: '**', redirectTo: 'login' },
];
