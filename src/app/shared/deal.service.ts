import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {serverHost} from '../../environments/environment.prod';
import {catchError, map} from 'rxjs/operators';
import {Deal} from './deal';

@Injectable({
  providedIn: 'root'
})
export class DealService {
  constructor(private http: HttpClient, public router: Router) { }

  getDeals(): Observable<any> {
    const api = `${serverHost.EndPoint}/deal/all`;
    return this.http.get(api, {headers: serverHost.headers}).pipe(
      map(res => {
        return res || [{}];
      }),
      catchError(this.handleError)
    );
  }

  deleteDeal(id: any){
    return this.http.get<any>(`${serverHost.EndPoint}/deal/delete/${id}`, {headers: serverHost.headers})
      .subscribe((res : any) => {
          this.router.navigate(['list']);
      })
  }

  getDeal(id: any): Observable<any> {
    const api = `${serverHost.EndPoint}/deal/${id}`;
    return this.http.get(api, {headers: serverHost.headers}).pipe(
      map(res => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  getComment(id: any): Observable<any> {
    const api = `${serverHost.EndPoint}/comment/${id}`;
    return this.http.get(api, {headers: serverHost.headers}).pipe(
      map(res => {
        return res || [{}];
      }),
      catchError(this.handleError)
    );
  }


  newDeal(deal: Deal) {
    return this.http
      .post<any>(`${serverHost.EndPoint}/deal/new`, deal)
      .subscribe((res: any) => {
        this.router.navigate(['new-deal/' + res.ID]);
      });
  }

  delDeal(id: any) {
    return this.http
      .get<any>(`${serverHost.EndPoint}/deal/delete/${id}`)
      .subscribe((res: any) => {
        this.router.navigate(['list']);
      });
  }


  updateDeal(deal: Deal) {
    return this.http
      .post<any>(`${serverHost.EndPoint}/deal/update`, deal)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        this.router.navigate(['deal/' + deal.ID]);
      });
  }

  getDealImage(xid: string){
    let imageUrl;
    this.http
      .get<any>(`${serverHost.EndPoint}/public/image/${xid}`)
      .subscribe((res: any) => {
       imageUrl = res
      });
    return imageUrl
  }

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
