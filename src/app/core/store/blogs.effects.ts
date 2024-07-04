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
        switchMap((action) => // Extract parameters from the action
          this.http.get(`${apiUrl}/blogs`, {
            params: {
              limit: action.limit.toString(), // Convert to string if necessary
              offset: action.offset.toString(),
              search: action.search
            }
          }).pipe(
            map((blogs: any) => BlogsActions.loadBlogsSuccess({ blogs })),
            catchError((error) => of(BlogsActions.loadBlogsFailure({ error })))
          )
        )
      )
    );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
