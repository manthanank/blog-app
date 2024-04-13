import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';

const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  http = inject(HttpClient);
  
  constructor() { }

  getUserDetails(username: string) {
    return this.http.get(`${apiUrl}/profile/${username}`);
  }

}