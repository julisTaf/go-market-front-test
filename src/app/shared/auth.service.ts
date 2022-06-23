import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import {serverHost} from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint = serverHost.EndPoint
  headers = serverHost.headers;
  currentUser = new User();
  constructor(private http: HttpClient, public router: Router) {}
  // Sign-up
  signUp(user: User): Observable<any> {
    const api = `${this.endpoint}/public/signup`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }
  // Sign-in
  signIn(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/public/login`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('id', res.user_id);
        // tslint:disable-next-line:no-shadowed-variable
        console.log(res.token)
          this.getUserProfile(res.user_id).subscribe(res => {
            this.currentUser = res;
            this.router.navigate(['list']);
          });
      });
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem('access_token');
    return authToken !== null;
  }
  doLogout() {
    const removeToken = localStorage.removeItem('access_token');
    const removeData = localStorage.removeItem('id')
    if (removeToken == null) {
      this.router.navigate(['auth/login']);
    }
  }
  // User profile
  getUserProfile(id: any): Observable<any> {
    const api = `${this.endpoint}/protected/profile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  getUserDataFromStorage(): Observable<any>{
    const id = localStorage.getItem('id')
    return this.getUserProfile(id)
  }
  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
