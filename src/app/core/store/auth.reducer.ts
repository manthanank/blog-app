import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface State {
    token: string | null;
    userId: string | null;
    error: any;
}

export const initialState: State = {
    token: null,
    userId: null,
    error: null,
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.loginSuccess, (state, action) => ({
        ...state,
        token: action.token,
        userId: action.userId,
        email: action.email,
        name: action.name,
        error: null,
    })),
    on(AuthActions.loginFailure, (state, action) => ({
        ...state,
        error: action.error,
    }))
);