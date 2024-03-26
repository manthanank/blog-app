import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>('auth');

export const selectAuthToken = createSelector(
    selectAuthState,
    state => state.token
);

export const selectAuthUserId = createSelector(
    selectAuthState,
    state => state.userId
);