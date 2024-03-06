import { createReducer, on } from '@ngrx/store';
import * as BlogsActions from './blogs.actions';
import { Blog } from '../models/blog.model';

export interface State {
    blogs: Blog[];
    error: any;
}

export const initialState: State = {
    blogs: [],
    error: null,
};

export const blogsReducer = createReducer(
    initialState,
    on(BlogsActions.loadBlogsSuccess, (state, action) => ({
        ...state,
        blogs: action.blogs,
        error: null,
    })),
    on(BlogsActions.loadBlogsFailure, (state, action) => ({
        ...state,
        error: action.error,
    }))
);