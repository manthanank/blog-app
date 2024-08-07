import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
    {
      path: '',
      loadComponent: () =>
        import('./pages/home/home.component').then((m) => m.HomeComponent),
    },
    {
      path: 'login',
      loadComponent: () =>
        import('./pages/auth/login/login.component').then((m) => m.LoginComponent),
    },
    {
      path: 'register',
      loadComponent: () =>
        import('./pages/auth/register/register.component').then((m) => m.RegisterComponent),
    },
    {
      path: 'forgot-password',
      loadComponent: () =>
        import('./pages/auth/forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent),
    },
    {
      path: 'reset-password/:token/:email',
      loadComponent: () =>
        import('./pages/auth/reset-password/reset-password.component').then((m) => m.ResetPasswordComponent),
    },
    {
      path: 'users',
      canActivate: [roleGuard],
      loadComponent: () =>
        import('./pages/users/users-list/users-list.component').then((m) => m.UsersListComponent),
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
      path: 'profile/:username',
      loadComponent: () =>
        import('./pages/profile/view-profile/view-profile.component').then((m) => m.ViewProfileComponent),
    },
    {
      path: 'edit-profile/:id',
      canActivate: [authGuard],
      loadComponent: () =>
        import('./pages/profile/edit-profile/edit-profile.component').then((m) => m.EditProfileComponent),
    },
    {
      path: 'add',
      canActivate: [authGuard],
      loadComponent: () =>
        import('./pages/blogs/blog-add/blog-add.component').then((m) => m.BlogAddComponent),
    },
    {
      path: 'edit/:id',
      canActivate: [authGuard],
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
  
