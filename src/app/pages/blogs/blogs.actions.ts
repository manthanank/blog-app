import { createAction, props } from '@ngrx/store';
import { Blog } from '../../models/blog.model';

export const loadBlogs = createAction('[Blogs] Load Blogs');

export const loadBlogsSuccess = createAction(
    '[Blogs] Load Blogs Success',
    props<{ blogs: Blog[] }>()
);

export const loadBlogsFailure = createAction(
    '[Blogs] Load Blogs Failure',
    props<{ error: any }>()
);