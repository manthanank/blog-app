import { Routes } from '@angular/router';
import { authGuard } from '../../guards/auth.guard';

export const blogRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../../components/blogs/blogs.component').then(
        (m) => m.BlogsComponent
      ),
  },
  {
    path: 'new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../../components/post-crud/create-post.component').then(
        (m) => m.CreatePostComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('../../components/post-details/post-details.component').then(
        (m) => m.PostDetailsComponent
      ),
  },
  {
    path: ':id/edit',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../../components/post-crud/edit-post.component').then(
        (m) => m.EditPostComponent
      ),
  },
];
