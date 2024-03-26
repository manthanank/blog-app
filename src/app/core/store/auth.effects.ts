import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as AuthActions from './auth.actions';
import { environment } from '../../../environments/environment.development';

const apiUrl = environment.apiUrl;

@Injectable()
export class AuthEffects {
    loginStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginStart),
            switchMap(action =>
                this.http.post(`${apiUrl}/login`, { email: action.email, password: action.password }).pipe(
                    map((res: any) => AuthActions.loginSuccess({ token: res.token, userId: res.userId, email: res.email, name: res.name})),
                    catchError(error => of(AuthActions.loginFailure({ error })))
                )
            )
        )
    );

    constructor(private actions$: Actions, private http: HttpClient) {}
}