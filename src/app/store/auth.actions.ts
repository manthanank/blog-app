import { createAction, props } from '@ngrx/store';

export const loginStart = createAction(
    '[Auth] Login Start',
    props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ token: string; userId: string, email: string, name: string }>()
);

export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: any }>()
);