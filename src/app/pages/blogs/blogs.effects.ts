import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as BlogsActions from './blogs.actions';
import { environment } from '../../../environments/environment.development';

const apiUrl = environment.apiUrl;

@Injectable()
export class BlogsEffects {
  loadBlogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogsActions.loadBlogs),
      switchMap(() =>
        this.http.get(`${apiUrl}/blogs`).pipe(
          map((blogs: any) => BlogsActions.loadBlogsSuccess({ blogs })),
          catchError((error) => of(BlogsActions.loadBlogsFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
