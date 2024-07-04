import { createAction, props } from '@ngrx/store';
import { Blog } from '../models/blog.model';

export const loadBlogs = createAction(
  '[Blogs Page] Load Blogs',
  props<{ limit: number; offset: number; search: string }>()
);

export const loadBlogsSuccess = createAction(
    '[Blogs] Load Blogs Success',
    props<{ blogs: Blog[] }>()
);

export const loadBlogsFailure = createAction(
    '[Blogs] Load Blogs Failure',
    props<{ error: any }>()
);

export const searchBlogs = createAction(
    '[Blogs] Search Blogs',
    props<{ searchTerm: string }>()
);