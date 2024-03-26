import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBlogs from './blogs.reducer';

export const selectBlogsState = createFeatureSelector<fromBlogs.State>('blogs');

export const selectAllBlogs = createSelector(
    selectBlogsState,
    state => state.blogs
);