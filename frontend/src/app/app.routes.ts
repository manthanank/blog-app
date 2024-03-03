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
    path: 'blogs/:id',
    loadComponent: () =>
      import('./pages/blogs/blog-details/blog-details.component').then((m) => m.BlogDetailsComponent),
  },
  {
    path: 'tags',
    loadComponent: () =>
      import('./pages/tags/tags.component').then((m) => m.TagsComponent), 
  },
  { path: '**', redirectTo: 'login' },
];
