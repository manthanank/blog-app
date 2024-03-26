import { createReducer, on } from '@ngrx/store';
import * as BlogsActions from './blogs.actions';
import { Blog } from '../models/blog.model';

export interface State {
    blogs: Blog[];
    error: any;
    loading: boolean;
}

export const initialState: State = {
    blogs: [],
    error: null,
    loading: false,
};

export const blogsReducer = createReducer(
    initialState,
    on(BlogsActions.loadBlogs, state => ({
        ...state,
        loading: true,
    })),
    on(BlogsActions.loadBlogsSuccess, (state, action) => ({
        ...state,
        blogs: action.blogs,
        error: null,
        loading: false,
    })),
    on(BlogsActions.loadBlogsFailure, (state, action) => ({
        ...state,
        error: action.error,
        loading: false,
    }))
);