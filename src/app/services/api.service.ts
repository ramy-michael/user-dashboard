import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { CacheService } from './cache.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL = 'https://reqres.in/api/' ;
  constructor(private http: HttpClient, private cacheService: CacheService) { }

  // getUsers(page: number){
  //   return this.http.get<any>(`${this.baseURL}users?page=${page}&per_page=6`);
  // }

  // getUserById(id: number){
  //   return this.http.get(`${this.baseURL}users/${id}`);
  // }

  getUsers(page: number) {
    const cacheKey = `users_page_${page}`;
    const cachedData = this.cacheService.get(cacheKey);
    if (cachedData) {
      return of(cachedData); // Return cached data if available
    } else {
      return this.http.get<any>(`${this.baseURL}users?page=${page}`).pipe(
        map(response => {
          this.cacheService.put(cacheKey, response); // Cache the response
          return response;
        })
      );
    }
  }

  getUserById(id: number) {
    const cacheKey = `user_${id}`;
    const cachedData = this.cacheService.get(cacheKey);
    if (cachedData) {
      return of(cachedData); // Return cached data if available
    } else {
      return this.http.get<any>(`${this.baseURL}users/${id}`).pipe(
        map(response => {
          this.cacheService.put(cacheKey, response); // Cache the response
          return response;
        })
      );
    }
  }

}
