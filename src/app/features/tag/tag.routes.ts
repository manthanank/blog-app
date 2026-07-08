import { Routes } from '@angular/router';

export const tagRoutes: Routes = [
  { path: '', loadComponent: () => import('../../components/tags/tags.component').then((m) => m.TagsComponent) }
];