import { Routes } from '@angular/router';
import { blogRoutes } from './features/blog/blog.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'blogs',
    children: blogRoutes
  },
  {
    path: 'post/:id',
    loadComponent: () =>
      import('./components/post-details/post-details.component').then(
        (m) => m.PostDetailsComponent
      ),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/about/about.component').then(
        (m) => m.AboutComponent
      ),
  },
  {
    path: 'tags',
    loadComponent: () =>
      import('./components/tags/tags.component').then((m) => m.TagsComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/auth/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./components/auth/forgot-password.component').then((m) => m.ForgotPasswordComponent),
  },
  {
    path: 'reset-password/:token/:email',
    loadComponent: () =>
      import('./components/auth/reset-password.component').then((m) => m.ResetPasswordComponent),
  },
  {
    path: 'profile/:username',
    loadComponent: () =>
      import('./components/profile/view-profile.component').then((m) => m.ViewProfileComponent),
  },
  {
    path: 'terms',
    loadComponent: () =>
      import('./components/legal/terms.component').then(
        (m) => m.TermsComponent
      ),
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./components/legal/privacy.component').then(
        (m) => m.PrivacyComponent
      ),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./components/contact/contact.component').then(
        (m) => m.ContactComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  }
];
